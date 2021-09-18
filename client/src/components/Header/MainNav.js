import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { BrowserView } from "react-device-detect";

const MainNav = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.querySelector(".search-bar").dir = i18n.dir();
    // eslint-disable-next-line
  }, [i18n.language]);

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <Link to="/">
          <img id="nav-logo" alt={t("logo.alt")} src={t("logo.src")} />
        </Link>
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
        <Link to="/login">
          <div className="d-flex align-items-center gap-auto">
            <FaUser className="icon" />
            <BrowserView>
              <span>{t("login")}</span>
            </BrowserView>
          </div>
        </Link>
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
