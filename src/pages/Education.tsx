import { useTranslation } from "react-i18next";
import { useState } from "react";
import config from "../config";

interface RegistrationForm {
  parentName: string;
  phone: string;
  email: string;
  children: {
    name: string;
    age: string;
    course: string;
    level: string;
  }[];
}

export default function Education() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [formData, setFormData] = useState<RegistrationForm>({
    parentName: "",
    phone: "",
    email: "",
    children: [{ name: "", age: "", course: "arabic", level: "beginner" }],
  });

  const addChild = () => {
    setFormData({
      ...formData,
      children: [
        ...formData.children,
        { name: "", age: "", course: "arabic", level: "beginner" },
      ],
    });
  };

  const removeChild = (index: number) => {
    const newChildren = formData.children.filter((_, i) => i !== index);
    setFormData({ ...formData, children: newChildren });
  };

  const handleChildChange = (index: number, field: string, value: string) => {
    const newChildren = formData.children.map((child, i) => {
      if (i === index) {
        return { ...child, [field]: value };
      }
      return child;
    });
    setFormData({ ...formData, children: newChildren });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(t("education.registrationSuccess"));
        setFormData({
          parentName: "",
          phone: "",
          email: "",
          children: [
            { name: "", age: "", course: "arabic", level: "beginner" },
          ],
        });
      } else {
        alert(t("education.registrationError"));
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(t("education.registrationError"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="relative h-[40vh] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#262262]/80 to-[#009245]/80" />
        <div className="relative container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("education.title")}
          </h1>
          <p className="text-xl text-white">{t("education.description")}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#262262] mb-6">
            {t("education.registrationForm")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parent Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#009245]">
                {t("education.parentInfo")}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("education.parentName")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) =>
                      setFormData({ ...formData, parentName: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009245] focus:ring-[#009245]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("education.phone")}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009245] focus:ring-[#009245]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("education.email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009245] focus:ring-[#009245]"
                  />
                </div>
              </div>
            </div>

            {/* Children Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#009245]">
                {t("education.childrenInfo")}
              </h3>
              {formData.children.map((child, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium">
                      {t("education.child")} {index + 1}
                    </h4>
                    {formData.children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChild(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        {t("education.remove")}
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("education.childName")}
                      </label>
                      <input
                        type="text"
                        required
                        value={child.name}
                        onChange={(e) =>
                          handleChildChange(index, "name", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009245] focus:ring-[#009245]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("education.age")}
                      </label>
                      <input
                        type="number"
                        required
                        min="4"
                        max="18"
                        value={child.age}
                        onChange={(e) =>
                          handleChildChange(index, "age", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009245] focus:ring-[#009245]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("education.course")}
                      </label>
                      <select
                        value={child.course}
                        onChange={(e) =>
                          handleChildChange(index, "course", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009245] focus:ring-[#009245]"
                      >
                        <option value="arabic">
                          {t("education.arabicCourse")}
                        </option>
                        <option value="quran">
                          {t("education.quranCourse")}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("education.level")}
                      </label>
                      <select
                        value={child.level}
                        onChange={(e) =>
                          handleChildChange(index, "level", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009245] focus:ring-[#009245]"
                      >
                        <option value="beginner">
                          {t("education.beginnerLevel")}
                        </option>
                        <option value="intermediate">
                          {t("education.intermediateLevel")}
                        </option>
                        <option value="advanced">
                          {t("education.advancedLevel")}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addChild}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#009245] bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009245]"
              >
                {t("education.addChild")}
              </button>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#009245] hover:bg-[#007935] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009245]"
            >
              {t("education.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
