import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => i18n.changeLanguage("de")}
        variant={i18n.language === "de" ? "primary" : "secondary"}
        size="sm"
      >
        DE
      </Button>
      <Button
        onClick={() => i18n.changeLanguage("ar")}
        variant={i18n.language === "ar" ? "primary" : "secondary"}
        size="sm"
      >
        عربي
      </Button>
      <Button
        onClick={() => i18n.changeLanguage("fr")}
        variant={i18n.language === "fr" ? "primary" : "secondary"}
        size="sm"
      >
        FR
      </Button>
    </div>
  );
}
