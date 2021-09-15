import React from "react";
import "flag-icon-css/css/flag-icon.css";
import { FaShippingFast } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TopBar = () => {
  const { t, i18n } = useTranslation();
  const handleLanguageSwitch = () => {
    i18n.language === "ar"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage("ar");
  };
  return (
    <div className="top-bar">
      <div className="d-flex justify-content-between">
        <div className="top-bar-content-container">
          <div className="d-flex align-items-center gap-1">
            <FaShippingFast />
            {t("fastShipping")}
          </div>
        </div>
        <div className="d-flex align-items-center gap-1 top-bar-content-container">
          <div className="d-flex align-items-center gap-1">
            {t("saudi")}
            <span className="flag-icon flag-icon-sa"></span>
          </div>
          <button className="lang-btn" onClick={handleLanguageSwitch}>
            {i18n.language === "ar" ? "English" : "العربية"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
