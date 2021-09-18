import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Register = () => {
  const { t } = useTranslation();
  return (
    <div className="auth-screen">
      <Helmet>
        <title>Register - Antika</title>
      </Helmet>
      <div className="auth-container space-even">
        <div className="d-flex justify-content-center">
          <h1 className="auth-head">{t("register")}</h1>
        </div>
        <p>
          {t("alreadyregistered")}{" "}
          <Link to="/login" className="text-orange">
            {t("login")}
          </Link>
        </p>
        <div className="auth-form space-even">
          <h5>{t("name")}</h5>
          <input
            type="text"
            name="name"
            className="w-100"
            placeholder={t("entername")}
          />
          <h5>{t("email")}</h5>
          <input type="text" className="w-100" placeholder={t("enteremail")} />
          <h5>{t("passowrd")}</h5>
          <input
            type="password"
            className="w-100"
            placeholder={t("enterpassowrd")}
          />
          <h5>{t("confirmpassowrd")}</h5>
          <input
            type="password"
            className="w-100"
            placeholder={t("enterconfirmpassowrd")}
          />
          <button className="product-card-button-inline w-100">
            {t("register")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
