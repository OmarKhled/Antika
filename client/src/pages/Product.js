import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/Products/single/singleProductActions";

import LoadingComponent from "../components/LoadingComponent";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";

const Product = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const { product, loading, alerts } = useSelector((state) => state.product);
  const { img, price, inStock } = product;

  const { i18n, t } = useTranslation();
  const { language } = i18n;

  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setMainImg(img.src[0]);
    // eslint-disable-next-line
  }, [product]);

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Product",
    "name": product["en"].name,
    "description": product["en"].description,
    "offers": {
      "@type": "Offer",
      "price": `${product.price} SAR`,
    },
    "images": img.src.map(image => `${window.location.hostname}${image}`)
  };

  return (
    <>
      {alerts.length > 0 ? (
        <>
          {alerts.map((alert) => (
            <div className="error">{alert}</div>
          ))}
        </>
      ) : (
        <>
          <div className="product-showcase">
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Helmet>
                  <title>{`${product[language].name} - ${
                    language === "ar" ? "أنتيكه" : "Antika"
                  }`}</title>
                  <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
                  <meta
                    property="og:description"
                    content={`${product[language].description}`}
                  />
                  <meta property="og:title" content={`${product[language].name} - ${
                    language === "ar" ? "أنتيكه" : "Antika"
                  }`} />
                  <meta
                    property="og:image"
                    content={`http://${window.location.hostname}${img.src[0]}`}
                  />
                  <meta name="twitter:title" content={`${product[language].name} - ${
                    language === "ar" ? "أنتيكه" : "Antika"
                  }`} />
                  <meta
                    name="twitter:description"
                    content={`${product[language].description}`}
                  />
                  <meta
                    name="twitter:image"
                    content={`http://${window.location.hostname}${img.src[0]}`}
                  />
                </Helmet>
                <div className="product-showcase-viewer">
                  <div className="product-showcase-image-preview embed-responsive embed-responsive-1by1">
                    <img
                      src={mainImg}
                      alt={img.alt}
                      className="embed-responsive-item"
                    />
                  </div>
                  <div className="product-showcase-image-thumbnails gap-auto-1">
                    {img.src.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setMainImg(image)}
                        className="embed-responsive embed-responsive-1by1 product-showcase-image-thumbnail"
                      >
                        <img
                          className="embed-responsive-item"
                          src={image}
                          alt={product["en"].name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="product-showcase-details space-even">
                  <h1>{product[language].name}</h1>
                  <p className="description">{product[language].description}</p>
                  <h5 className="price">
                    {price} {t("sa")}
                    <p className="muted">{t("includingtax")}</p>
                  </h5>
                  <div className="d-flex gap-auto">
                    <div className="shipping-info">
                      <img src="/static/images/logo_small.svg" alt="logo" />
                      <p className="shipping-info-text">{t("shippedfrom")}</p>
                    </div>
                    {inStock === 0 ? (
                      <div className="unavilable">
                        {" "}
                        <AiOutlineClose />
                        <span>{t("unavilable")}</span>
                      </div>
                    ) : (
                      <div className="avilable">
                        {" "}
                        <FcCheckmark />
                        <span>{t("avilable")}</span>
                      </div>
                    )}
                  </div>
                  {inStock === 0 ? (
                    <div>
                      <p>{t("outofstock")}</p>
                    </div>
                  ) : (
                    inStock <= 5 &&
                    inStock > 0 && (
                      <div>
                        <p style={{ color: "red" }}>{t("hurryup")}</p>
                      </div>
                    )
                  )}
                  <div className="d-flex align-items-center gap-auto">
                    <button
                      disabled={inStock === 0}
                      className="product-card-button-inline"
                    >
                      {t("addtocart")}
                    </button>
                    <button
                      disabled={inStock === 0}
                      className="product-card-button-inline bg-success"
                    >
                      {t("requestpreview")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-5">
            <h3>{t("reviews")}</h3>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <input
                type="text"
                className="w-100"
                placeholder={t("writereview")}
              />
              <button className="product-card-button-inline">
                {t("addreview")}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
