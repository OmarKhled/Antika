import React from "react";

const LoadingComponent = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow spinner-orange" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingComponent;
