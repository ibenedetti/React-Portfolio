import React from "react";
import Carousel from "./Carousel";
import "./style.css";

const Shuffle = () => {
  return (
    <div>
      <div className="text-box">
        <h3>Shuffle</h3>
        <p>To the time some people asked me to fix the code for their card shuffling website, paid and disappeared before I could even ask for the url.</p>
      </div>
      <Carousel prefix="SHUFFLE-" count={4} />
    </div>
  );
};

export default Shuffle;
