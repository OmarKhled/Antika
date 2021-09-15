import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const MainNav = () => {
  const { t } = useTranslation();

  return (
    <div>
      <nav className="nav-container">
        <div className="logo-container">
          <a href="/">
            <img alt={t("logo.alt")} src={t("logo.src")} />
          </a>
        </div>
        <div className="search-bar-container">
          <div className="inside-container">
            <input
              type="text"
              className="search-bar"
              placeholder={t("search")}
            />
            <button className="search-icon">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2 links">
          <div className="d-flex align-items-center gap-1 cart">
            <FaUser />
            <span>{t("login")}</span>
          </div>
          <div className="d-flex align-items-center gap-1 cart">
            <FaShoppingCart />
            <span>{t("cart")}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainNav;
