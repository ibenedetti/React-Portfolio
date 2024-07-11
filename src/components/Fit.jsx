import React from "react";
import Carousel from "./Carousel";
import "./style.css";

const Fit = () => {
  return (
    <div>
      <div className="text-box">
        <h3>Fit</h3>
        <p>To my lovechild just before I learnt how to use React and did everything by hand.</p>
      </div>
      <Carousel prefix="FIT-" count={4} />
    </div>
  );
};

export default Fit;
