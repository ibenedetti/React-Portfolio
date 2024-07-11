import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { Beginning, Shuffle, Fit, CPLED, Final } from "./"; // Import from index.js

const ExperienceCard = ({ onClick, title, isActive, isMobile }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer sm:mb-5 p-5 max-w-xl relative sm:text-left text-center ${
        isMobile ? "text-quaternary" : ""
      }`}
    >
      <h3 className={`text-xl lg:text-2xl xl:text-3xl font-bold sm:pl-8 ${
          isActive || isMobile ? "text-quaternary" : "text-slate-600"
        }`}
      >
        {title}
      </h3>
    </div>
  );
};

const Experience = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeExperience, setActiveExperience] = useState("Beginning");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderExperience = () => {
    switch (activeExperience) {
      case "Beginning":
        return <Beginning />;
      case "Shuffle":
        return <Shuffle />;
      case "Fit":
        return <Fit />;
      case "CPLED":
        return <CPLED />;
      case "Final":
        return <Final />;
      default:
        return <Beginning />;
    }
  };

  return (
    <div className="sm:my-20 relative">
      <motion.div variants={textVariant()}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          My path
        </motion.h2>
      </motion.div>

      <ul className="experience-list">
        <ExperienceCard
          onClick={() => setActiveExperience("Beginning")}
          title="Beginning"
          isActive={activeExperience === "Beginning"}
          isMobile={isMobile}
        />
        <ExperienceCard
          onClick={() => setActiveExperience("Final")}
          title="Final"
          isActive={activeExperience === "Final"}
          isMobile={isMobile}
        />
        <ExperienceCard
          onClick={() => setActiveExperience("Shuffle")}
          title="Shuffle"
          isActive={activeExperience === "Shuffle"}
          isMobile={isMobile}
        />
        <ExperienceCard
          onClick={() => setActiveExperience("Fit")}
          title="Fit"
          isActive={activeExperience === "Fit"}
          isMobile={isMobile}
        />
        <ExperienceCard
          onClick={() => setActiveExperience("CPLED")}
          title="CPLED"
          isActive={activeExperience === "CPLED"}
          isMobile={isMobile}
        />
      </ul>

      <div className="exp-container mt-8">
        {renderExperience()}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "portfolio");
