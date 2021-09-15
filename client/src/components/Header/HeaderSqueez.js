import React, { useEffect } from "react";

const HeaderSqueez = () => {
  useEffect(() => {
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      // if (document.body.clientWidth > 575) {
      if (window.scrollY > 20) {
        if (!header.classList.contains("squeez")) {
          header.classList.add("squeez");
        }
      } else {
        if (header.classList.contains("squeez")) {
          header.classList.remove("squeez");
        }
      }
      // }
    });
  }, []);
  return <></>;
};

export default HeaderSqueez;
