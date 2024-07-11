import React from "react";
import "./style.css";

const Carousel = ({ prefix, count }) => {
  const images = Array.from({ length: count }, (_, i) => (
    `../../src/assets/img/${prefix}${i + 1}.png`
  ));

  return (
    <div className="banner">
      <div className="slider" style={{ "--quantity": count }}>
        {images.map((src, index) => (
          <div
            key={index}
            className="item"
            style={{ "--position": index + 1 }}
          >
            <img src={src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
