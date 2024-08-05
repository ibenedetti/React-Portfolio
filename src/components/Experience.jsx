import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { Beginning, Shuffle, Fit, CPLED, Final } from "./";
import ModelCanvas from "./ModelCanvas";

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

    const handleTimelineElementClick = (title) => {
        setActiveExperience((prev) => (prev === title ? "" : title));
    };

    const experiences = [
        { title: "Sound Engineering", component: <Beginning />, date: "2009 - 2019" },
        { title: "The Spark of Programming", component: <Shuffle />, date: "2019 - 2022" },
        { title: "First Steps", component: <Fit />, date: "2022 - 2023" },
        { title: "The Loop", component: <CPLED />, date: "2023" },
        { title: "Now", component: <Final />, date: "2024 - Present" },
    ];

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

            <VerticalTimeline>
                {experiences.map((exp, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'transparent', color: '#bbbbbb' }}
                        contentArrowStyle={{ borderRight: '7px solid #f9f9f9' }}
                        date={exp.date}
                        iconStyle={{ background: '#02151C', color: '#fff' }}
                        icon={<div className={`experience-icon ${activeExperience === exp.title ? 'active' : ''}`} />}
                        onTimelineElementClick={() => handleTimelineElementClick(exp.title)}
                    >
                        <h3 className="vertical-timeline-element-title">{exp.title}</h3>
                        <div className={`experience-content ${activeExperience === exp.title ? 'active' : ''}`}>
                            {activeExperience === exp.title && exp.component}
                        </div>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>

            <ModelCanvas className="model-canvas absolute" activeExperience={activeExperience} />
        </div>
    );
};

export default SectionWrapper(Experience, "portfolio");
