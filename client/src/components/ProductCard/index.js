import React, { useState } from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartAdd } from "../../redux/Cart/cartActions";

const ProductCard = ({ product, loading, addtocart }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { language } = i18n;
  const { img, price } = product;
  // eslint-disable-next-line
  const toIndiaDigits = (string) => {
    var id = ["٠", "١", "٢", "٣", "٤", "٥", "	٦", "٧", "٨", "٩"];
    return string.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };
  const [added, setAdded] = useState(false);
  const cartAddHandler = () => {
    if (product.inStock > 0) {
      dispatch(cartAdd(product));
    }

    setTimeout(() => {
      setAdded(true);
    }, 100);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <div className={`${loading ? "loading" : ""} product-card`}>
      {loading ? (
        <>
          <div className="product-card-image embed-responsive embed-responsive-1by1">
            <img className="embed-responsive-item" alt="" />
          </div>
          <div className="product-card-body">
            <p className="head"></p>
            <p className="price"></p>
            <p></p>
            <button
              style={{ cursor: "unset" }}
              className="loading button w-100 mt-2"
            >
              {t("seemore")}
            </button>
          </div>
        </>
      ) : (
        <>
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
              {price} {t("sa")}
            </p>
            <p>
              {t("category")}:{" "}
              <a href="#/">{_.startCase(product.category.name[language])}</a>
            </p>
            {addtocart ? (
              <button
                disabled={product.inStock === 0}
                onClick={cartAddHandler}
                className={`button-primary w-100 ${added ? "success" : ""}`}
              >
                {added ? t("added") : t("addtocart")}
              </button>
            ) : (
              <Link
                to={`/products/${product._id}`}
                className="button-primary w-100 mt-2"
              >
                {t("seemore")}
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
