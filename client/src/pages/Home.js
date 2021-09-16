import React from "react";
import Carousel from "../components/Carousel";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* <h1>{t("test")}</h1> */}
      <Carousel />
    </div>
  );
};

export default Home;
