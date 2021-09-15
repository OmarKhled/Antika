import React from "react";
import { useTranslation } from "react-i18next";
import MainNav from "./MainNav";
import TopBar from "./TopBar";

const Header = () => {
  // eslint-disable-next-line
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <header>
      <TopBar />
      <MainNav />
    </header>
  );
};

export default Header;
