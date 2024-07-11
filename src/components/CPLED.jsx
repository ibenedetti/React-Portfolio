import React from "react";
import Carousel from "./Carousel";
import "./style.css";

const CPLED = () => {
  return (
    <div>
      <div className="text-box">
        <h3>LED website</h3>
        <p>To my latest project. Still waiting from approval from the client.</p>
      </div>
      <Carousel prefix="CPLED-" count={4} />
    </div>
  );
};

export default CPLED;
