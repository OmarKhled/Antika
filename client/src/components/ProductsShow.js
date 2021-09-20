import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/Products/batch/productsActions";

import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import LoadingComponent from "./LoadingComponent";

const ProductsShow = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const { products, loading, alerts } = useSelector((state) => state.products);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="prodcuts-container mt-3">
      <h4 className="mb-3">{t("leatestproducts")}</h4>
      {loading ? (
        <LoadingComponent />
      ) : alerts.length > 0 ? (
        <>
          {alerts.map((alert, index) => (
            <div key={index} className="error mt-2">
              {alert}
            </div>
          ))}
        </>
      ) : (
        <Row>
          {products.map((product, index) => (
            <Col xs="12" sm="6" md="4" lg="3" key={index}>
              <ProductCard product={product} loading={false} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductsShow;
