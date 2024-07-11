import React from "react";
import Carousel from "./Carousel";
import "./style.css";

const Beginning = () => {
  return (
    <div>
      <div className="text-box">
        <h3>First steps</h3>
        <p>It's been a long way since I started this path. From my multiple courses and mentorships with more experienced people.</p>
      </div>
      <Carousel prefix="WH-" count={4} />
    </div>
  );
};

export default Beginning;
