import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#009245]">
      <h2
        className={`flex justify-center text-2xl font-bold mb-8 text-[#262262]`}
      >
        {t("contact")}
      </h2>
      <div className="space-y-6">
        <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
          <Phone
            className={`h-6 w-6 text-[#009245] flex-shrink-0 ${
              isRTL ? "mr-0 ml-3" : "mr-3"
            }`}
          />
          <span className="text-gray-700">+49 XXX XXXXXX</span>
        </div>
        <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
          <Mail
            className={`h-6 w-6 text-[#009245] flex-shrink-0 ${
              isRTL ? "mr-0 ml-3" : "mr-3"
            }`}
          />
          <span className="text-gray-700">info@alsalam-loerrach.org</span>
        </div>
        <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
          <MapPin
            className={`h-6 w-6 text-[#009245] flex-shrink-0 ${
              isRTL ? "mr-0 ml-3" : "mr-3"
            }`}
          />
          <span className="text-gray-700">
            Schopfheimer Str. 25, Brombach Lörrach, Deutschland
          </span>
        </div>
      </div>
      <div className="mt-6 w-full h-64 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.748988715842!2d7.656936776871645!3d47.6221523791840!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b029cdc8c2d5%3A0x4f4b1c34c5ea3cb0!2sSchopfheimer%20Str.%2025%2C%2079539%20L%C3%B6rrach%2C%20Germany!5e0!3m2!1sen!2s!4v1694101234567!5w!5h"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
