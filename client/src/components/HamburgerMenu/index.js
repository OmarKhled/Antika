import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const HamburgerMenu = ({ open, setOpen }) => {
  const { i18n, t } = useTranslation();
  const { language } = i18n;

  const handleLanguageSwitch = () => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById("hamburger-menu").style.display = "none";
      i18n.changeLanguage(language === "ar" ? "en" : "ar");
      window.location.reload();
    }, [300]);
  };
  useEffect(() => {
    if (open) {
      document.getElementById("hamburger-menu").style.opacity = "1";
      document.querySelector("body").style.overflow = "hidden";
      document.getElementById("hamburger-menu").style.pointerEvents = "inherit";
    } else {
      document.querySelector("body").style.overflow = "auto";
      document.querySelector("body").style.overflowX = "hidden";
      document.getElementById("hamburger-menu").style.opacity = "0";
      document.getElementById("hamburger-menu").style.pointerEvents = "none";
    }
  }, [open]);
  return (
    <nav id="hamburger-menu">
      <div className="d-flex align-items-center justify-content-between header">
        <img id="nav-logo" alt={t("logo.alt")} src={t("logo.src")} />
        <span
          onClick={() => setOpen(false)}
          style={{ cursor: "pointer" }}
          className="window-close"
        >
          x
        </span>
      </div>
      <ul>
        <li>{t("antiques")}</li>
        <li>{t("classicantiques")}</li>
        <li>{t("naturalantiques")}</li>
        <li>{t("wallpapers")}</li>
        <li>{t("ceilingantiques")}</li>
        <li onClick={handleLanguageSwitch}>
          {i18n.language === "ar" ? "English" : "العربية"}
        </li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
