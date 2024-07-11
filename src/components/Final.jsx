import React from "react";
import Carousel from "./Carousel";  // Correct the import path
import "./style.css";

const Final = () => {
  return (
    <div>
      <div className="text-box">
        <h3>Early experience</h3>
        <p>To that time I was &nbsp; </p>
        <div className="flicker-container">
              <section className="obsessed">
                  <span className="letter l-0">O</span>
                  <span className="letter l-1">B</span>
                  <span className="letter l-2">S</span>
                  <span className="letter l-3">E</span>
                  <span className="letter l-4">S</span>
                  <span className="letter l-5">S</span>
                  <span className="letter l-6">E</span>
                  <span className="letter l-7">D</span>
              </section>
          </div>
          
        <p> &nbsp; with flicker effects on websites.
        </p>
      </div>
      <Carousel prefix="FINAL-" count={4} />
    </div>
  );
};

export default Final;
