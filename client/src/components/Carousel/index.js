import React, { useState } from "react";
import image_ltr from "../../static/images/Antiques-ltr.png";
import image_rtl from "../../static/images/Antiques-rtl.png";
import { useTranslation } from "react-i18next";

const Carousel = () => {
  const { i18n } = useTranslation();
  const images = [
    {
      en: image_ltr,
      ar: image_rtl,
      alt: "Antiques Buy",
    },
  ];

  const [active, setActive] = useState(0);
  return (
    <>
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-image-container ${
              active === index ? "active" : ""
            }`}
          >
            {active === index && (
              <div className="embed-responsive embed-responsive-135by44">
                <img
                  className="embed-responsive-item"
                  src={i18n.language === "ar" ? image.ar : image.en}
                  alt={image.alt}
                />
              </div>
            )}
          </div>
        ))}
        <ul className="carousel-indecators">
          {images.map((image, index) => (
            <li
              className={`carousel-indecator ${
                active === index ? "selected" : ""
              }`}
              onClick={() => setActive(index)}
            ></li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Carousel;
