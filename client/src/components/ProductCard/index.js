import React from "react";
import _ from "lodash"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const { img, price } = product;

  const toIndiaDigits = (string) => {
    var id = ["٠", "١", "٢", "٣", "٤", "٥", "	٦", "٧", "٨", "٩"];
    return string.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  return (
    <div className="product-card">
      <div className="product-card-image embed-responsive embed-responsive-1by1">
        <Link to={`/products/${product._id}`}>
          <img
            src={img.src[0]}
            alt={img.alt}
            className="embed-responsive-item"
          />
        </Link>
      </div>
      <div className="product-card-body">
        <Link to={`/products/${product._id}`}>
          <h6>{product[language].name}</h6>
        </Link>
        <p className="price">
          {language === "ar" ? toIndiaDigits(price) : price} {t("sa")}
        </p>
        <p>
          {t("category")}: <a href="#/">{_.startCase(product.category.name[language])}</a>
        </p>
        <Link to={`/products/${product._id}`} className="button-primary w-100 mt-2">
          {t("seemore")}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
