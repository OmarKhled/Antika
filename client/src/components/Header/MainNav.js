import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { requestSearch } from "../../redux/Search/searchActions";

const MainNav = ({ setOpen, open, history }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);

  const [search, setSearch] = useState("");

  useEffect(() => {
    document.querySelector(".search-bar").dir = i18n.dir();
    // eslint-disable-next-line
  }, [i18n.language]);

  const handleSearch = () => {
    if (!(!search || search === "" || search.replace(/\s/g, "").length === 0)) {
      dispatch(requestSearch(search, i18n.language));
      history.push("/search");
    }
  };

  return (
    <nav className="nav-container">
      <div className="logo-container gap-auto">
        <GiHamburgerMenu
          className="hamburger-button mobile-view"
          onClick={() => setOpen(!open)}
        />
        <Link to="/">
          <img id="nav-logo" alt={t("logo.alt")} src={t("logo.src")} />
        </Link>
      </div>
      <div className="search-bar-container">
        <div className="inside-container">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPressCapture={({ key }) =>
              key === "Enter" ? handleSearch() : ""
            }
            type="text"
            className="search-bar"
            placeholder={t("search")}
          />
          <button onClick={handleSearch} className="search-icon">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="d-flex align-items-center gap-auto links">
        <Link to="/login">
          <div className="d-flex align-items-center gap-auto">
            <FaUser className="icon" />
            <span className="browser-view">{t("login")}</span>
          </div>
        </Link>
        <Link to="/cart">
          <div className="d-flex align-items-center gap-auto">
            <div className="cart">
              {/* <span className="sign">{items.length}</span> */}
              <span className="counter">{items.length}</span>
              <FaShoppingCart className="icon" />
            </div>
            <span className="browser-view">{t("cart")}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default withRouter(MainNav);
