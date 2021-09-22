import React from "react";
import image_ltr from "../../static/images/Antiques-ltr.png";
import image_rtl from "../../static/images/Antiques-rtl.png";
import { useTranslation } from "react-i18next";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const images = [
    {
      en: image_ltr,
      ar: image_rtl,
      alt: "Antiques Buy",
    },
    {
      en: image_ltr,
      ar: image_rtl,
      alt: "Antiques Buy",
    },
  ];
  const options = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider className="carousel" {...options}>
      {images.map((image, index) => (
        <div key={index}>
          <img className="slide" src={image[language]} alt={image.alt} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
