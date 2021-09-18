import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="auth-screen">
      <div className="auth-container space-even">
        <div className="d-flex justify-content-center">
          <h1 className="auth-head">{t("login")}</h1>
        </div>
        <p>
          {t("notregistered")}{" "}
          <Link to="/register" className="text-orange">
            {t("registernow")}
          </Link>
          !
        </p>
        <div className="auth-form space-even">
          <h5>{t("email")}</h5>
          <input
            type="email"
            name="email"
            className="w-100"
            placeholder={t("enteremail")}
          />
          <h5>{t("passowrd")}</h5>
          <input
            type="password"
            className="w-100"
            placeholder={t("enterpassowrd")}
          />
          <button className="product-card-button-inline w-100">
            {t("login")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
