import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/Products/single/singleProductActions";
import { cartAdd } from "../redux/Cart/cartActions";

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
  const { img, price, inStock, category, specifications } = product;

  const { i18n, t } = useTranslation();
  const { language } = i18n;

  const [mainImg, setMainImg] = useState("");
  const [added, setAdded] = useState(false);
  const [previewAdded, setPreviewAdded] = useState(false);

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
    name: product["en"].name,
    description: product["en"].description,
    offers: {
      "@type": "Offer",
      price: `${product.price} SAR`,
    },
    image: img.src.map((image) => `http://${window.location.hostname}${image}`),
  };

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

  const cartPreviewAddHandler = () => {
    if (product.inStock > 0) {
      dispatch(cartAdd(product, true));
    }

    setTimeout(() => {
      setPreviewAdded(true);
    }, 100);

    setTimeout(() => {
      setPreviewAdded(false);
    }, 1200);
  };

  return (
    <>
      {alerts.length > 0 ? (
        <>
          {alerts.map((alert, index) => (
            <div key={index} className="error">
              {alert}
            </div>
          ))}
        </>
      ) : (
        <>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <div className="product-showcase">
                <>
                  <Helmet>
                    <title>{`${product[language].name} - ${
                      language === "ar" ? "أنتيكه" : "Antika"
                    }`}</title>
                    <script type="application/ld+json">
                      {JSON.stringify(structuredData)}
                    </script>
                    <meta
                      property="og:description"
                      content={`${product[language].description}`}
                    />
                    <meta
                      property="og:title"
                      content={`${product[language].name} - ${
                        language === "ar" ? "أنتيكه" : "Antika"
                      }`}
                    />
                    <meta
                      property="og:image"
                      content={`http://${window.location.hostname}${img.src[0]}`}
                    />
                    <meta
                      name="twitter:title"
                      content={`${product[language].name} - ${
                        language === "ar" ? "أنتيكه" : "Antika"
                      }`}
                    />
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
                        alt={product[language].name}
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
                  <div className="product-showcase-details space-even-0">
                    <h1>{product[language].name}</h1>
                    <p className="description">
                      {product[language].description}
                    </p>
                    <p>
                      {t("category")}:{" "}
                      <a href="#/">{_.startCase(category.name[language])}</a>
                    </p>
                    <div>
                      <p>{t("features")}:</p>
                      <ul>
                        {specifications.features.map((feature, index) => (
                          <li key={index}>{feature[language]}</li>
                        ))}
                      </ul>
                    </div>
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
                    <div className="d-flex align-items-center gap-auto mt-2">
                      <button
                        disabled={inStock === 0}
                        onClick={cartAddHandler}
                        className={`button-primary ${added ? "success" : ""}`}
                      >
                        {added ? t("added") : t("addtocart")}
                      </button>
                      <button
                        disabled={inStock === 0}
                        onClick={cartPreviewAddHandler}
                        className={`button-secondary ${
                          previewAdded ? "success" : ""
                        }`}
                      >
                        {previewAdded ? t("requested") : t("requestpreview")}
                      </button>
                    </div>
                  </div>
                </>
              </div>
              <div className="mt-4 showcase">
                <h3 className="mb-2">{t("specifications")}</h3>
                <ul>
                  {specifications.width && specifications.height && (
                    <>
                      <li>
                        {t("width")}: {specifications.width} {t("cm")}
                      </li>
                      <li>
                        {t("height")}: {specifications.height} {t("cm")}
                      </li>
                    </>
                  )}
                  {specifications.brand &&
                    specifications.brand["en"] &&
                    specifications.brand["ar"] && (
                      <li>
                        {t("brand")}: {specifications.brand[language]}
                      </li>
                    )}
                  <li>
                    <div>
                      <p>{t("features")}:</p>
                      <ul>
                        {specifications.features.map((feature, index) => (
                          <li key={index}>{feature[language]}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <h3>{t("reviews")}</h3>
                <div className="d-flex align-items-center justify-content-center gap-auto">
                  <input
                    type="text"
                    className="w-100"
                    placeholder={t("writereview")}
                  />
                  <button className="button-primary">{t("addreview")}</button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Product;
