import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { BrowserView } from "react-device-detect";

const MainNav = () => {
  const { t } = useTranslation();

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <a href="/">
          <img id="nav-logo" alt={t("logo.alt")} src={t("logo.src")} />
        </a>
      </div>
      <div className="search-bar-container">
        <div className="inside-container">
          <input type="text" className="search-bar" placeholder={t("search")} />
          <button className="search-icon">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center gap-auto links">
        <div className="d-flex align-items-center gap-auto">
          <FaUser className="icon" />
          <BrowserView>
            <span>{t("login")}</span>
          </BrowserView>
        </div>
        <div className="d-flex align-items-center gap-auto">
          <FaShoppingCart className="icon" />
          <BrowserView>
            <span>{t("cart")}</span>
          </BrowserView>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
