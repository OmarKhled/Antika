import React from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line
import CategoriesBar from "./CategoriesBar";
import HeaderSqueez from "./HeaderSqueez";
import MainNav from "./MainNav";
import TopBar from "./TopBar";

const Header = ({ open, setOpen }) => {
  // eslint-disable-next-line
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  document.body.style.direction = i18n.dir();
  return (
    <>
      <header>
        <TopBar />
        <MainNav open={open} setOpen={setOpen} />
        {/* <CategoriesBar /> */}
      </header>
      <HeaderSqueez />
    </>
  );
};

export default Header;
