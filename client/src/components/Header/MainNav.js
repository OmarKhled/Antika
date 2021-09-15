import React from "react";
import { FaSearch } from "react-icons/fa";
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
        <div>cart</div>
      </nav>
    </div>
  );
};

export default MainNav;
