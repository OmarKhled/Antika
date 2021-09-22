import React from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";
import CartProductCard from "../components/CartProductCard";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  // eslint-disable-next-line
  const { t } = useTranslation();
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.product.price * item.qty;
  });
  return (
    <div>
      {/* <h1>{t("cart")}</h1> */}
      <div className="cart-container">
        <div className="cart-products">
          {items.length === 0 ? (
            <p className="fs-5 muted">{t("nothingincart")}</p>
          ) : (
            <>
              {items.map((item, index) => (
                <CartProductCard key={index} item={item} />
              ))}
            </>
          )}
        </div>
        <div className="cart-summary ">
          <div className="showcase">
            <h4>{t("totalprice")}</h4>
            <p className="price">
              {totalPrice} {t("sa")}
            </p>
            <p className="muted">{t("detirmenateshipping")}</p>
          </div>
          <button
            disabled={items.length === 0}
            className="button-primary mt-2 w-100"
          >
            {t("checkout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
