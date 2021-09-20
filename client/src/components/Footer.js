import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <footer className="footer">
        <section className="gap-auto-2">
          <div>
            <FaFacebook />
          </div>
          <div>
            <FaTwitter />
          </div>
          <div>
            <FaInstagram />
          </div>
        </section>
        <section className="footer-links gap-auto-2">
          <div>
            <a href="/#">{t("home")}</a>
          </div>
          <div>
            <a href="/#">{t("services")}</a>
          </div>
          <div>
            <a href="/#">{t("about")}</a>
          </div>
          <div>
            <a href="/#">{t("policy")}</a>
          </div>
        </section>
      </footer>
      <div className="bottom">
        <span>{t("rights")}</span>
      </div>
    </>
  );
};

export default Footer;
