import React from "react";
import { useTranslation } from "react-i18next";
import { FaTrashAlt } from "react-icons/fa";

const CartProductCard = ({ item }) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  return (
    <>
      <div className="cart-product-card gap-auto mb-2">
        <div className="img-container">
          <div className="embed-responsive embed-responsive-1by1">
            <img
              className="embed-responsive-item product-img"
              src={item.product.img.src[0]}
              alt={item.product[language].name}
            />
          </div>
        </div>
        <div className="product-details">
          <h4>
            {item.product[language].name}{" "}
            {item.isPreview && `- ${t("preview")}`}
          </h4>
          <div className="mb-1">
            <p className="price fs-6">
              {item.product.price} {t("sa")}{" "}
            </p>
          </div>
          <div className="shipping-info">
            <img src="/static/images/logo_small.svg" alt="logo" />
            <p className="shipping-info-text">{t("shippedfrom")}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <select className="qty-menu">
              {[1, 2, 3, 4, 5].map(
                (option) =>
                  option <= item.product.inStock && (
                    <option selected={option === item.qty} value={option}>
                      {option}
                    </option>
                  )
              )}
            </select>
            <button className="text-danger d-flex align-items-center gap-auto link">
              <span>{t("delete")}</span>
              <FaTrashAlt />{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
