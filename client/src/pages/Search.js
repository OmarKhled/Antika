import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const { loading, results, alerts } = useSelector((state) => state.search);
  useEffect(() => {
    console.log(results);
    if (loading) {
      setProducts([{}, {}, {}, {}]);
    } else {
      setProducts(results);
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <div className="showcase">
      <h4>{t("searchresults")}</h4>
      {products.length === 0 ? (
        <p className="mt-2 fs-5 muted">{t("noproducts")}</p>
      ) : (
        <Row className="mt-3">
          {products.map((product, index) => (
            <Col xs="12" sm="6" md="4" lg="3" key={index}>
              <ProductCard loading={_.isEmpty(product)} product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Search;
