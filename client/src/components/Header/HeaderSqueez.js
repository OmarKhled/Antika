import React, { useEffect } from "react";

const HeaderSqueez = () => {
  useEffect(() => {
    const header = document.querySelector("header");
    // const categoriesBar = document.querySelector(".categories-bar");
    window.addEventListener("scroll", () => {
      if (document.body.clientWidth > 600) {
        if (window.scrollY > 20) {
          if (!header.classList.contains("squeez")) {
            header.classList.add("squeez");
          }
          // if (!categoriesBar.classList.contains("hide")) {
          //   categoriesBar.classList.add("hide");
          // }
        } else {
          if (header.classList.contains("squeez")) {
            header.classList.remove("squeez");
          }
          // if (categoriesBar.classList.contains("hide")) {
          //   categoriesBar.classList.remove("hide");
          // }
        }
      }
    });
    window.addEventListener("resize", () => {
      if (document.body.clientWidth < 600) {
        if (header.classList.contains("squeez")) {
          header.classList.remove("squeez");
        }
      } else {
        if (window.scrollY > 20) {
          if (!header.classList.contains("squeez")) {
            header.classList.add("squeez");
          }
          // if (!categoriesBar.classList.contains("hide")) {
          //   categoriesBar.classList.add("hide");
          // }
        } else {
          if (header.classList.contains("squeez")) {
            header.classList.remove("squeez");
          }
          // if (categoriesBar.classList.contains("hide")) {
          //   categoriesBar.classList.remove("hide");
          // }
        }
      }
    });
  }, []);
  return <></>;
};

export default HeaderSqueez;
