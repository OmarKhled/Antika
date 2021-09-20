import React from "react";
import telephone from "../../static/images/icons/telephone.png";

const CategoriesBar = () => {
  return (
    <div className="browser-view categories-bar">
      <div className="category">
        <img src={telephone} alt="antique-icon" />
        <span>Antiques</span>
      </div>
    </div>
  );
};

export default CategoriesBar;
