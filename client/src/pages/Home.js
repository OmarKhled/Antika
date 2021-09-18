import React from "react";
import Carousel from "../components/Carousel";
import { useTranslation } from "react-i18next";
import ProductsShow from "../components/ProductsShow";

const Home = () => {
  // eslint-disable-next-line
  const { t } = useTranslation();
  return (
    <div>
      {/* <h1>{t("test")}</h1> */}
      <Carousel />
      <ProductsShow />
    </div>
  );
};

export default Home;
