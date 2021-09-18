import React from "react";
import Carousel from "../components/Carousel";
import { useTranslation } from "react-i18next";
import ProductsShow from "../components/ProductsShow";
import { Helmet } from "react-helmet";

const Home = () => {
  // eslint-disable-next-line
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <div>
      <Helmet>
        <title>
          {" "}
          {language === "ar"
            ? "أشترى انتيكاتك من انتيكه بافضل الاسعار فى المملكه العربيه السعوديه"
            : "Buy Antiques at the best prices in Saudi Arabia | Antika"}
        </title>
      </Helmet>
      <Carousel />
      <ProductsShow />
    </div>
  );
};

export default Home;
