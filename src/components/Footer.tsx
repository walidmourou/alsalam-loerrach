import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <footer className="bg-white shadow-inner">
      <div className="py-6">
        <div
          className={
            "flex flex-col lg:flex-row gap-4 items-center justify-between px-6 " +
            (isRTL ? " flex-row-reverse" : "")
          }
        >
          <img src="images/LogoDeBase.png" className="h-28 w-40" />
          <div
            className={
              "flex justify-center items-center text-[#262262]" +
              (isRTL ? " flex-row-reverse" : "")
            }
          >
            <p>©</p> <p className="p-1">{new Date().getFullYear()}</p>
            <p>{t("subtitle")}</p>
          </div>
          <div className="text-[#009245]">{t("footerText")}</div>
        </div>
      </div>
    </footer>
  );
}
