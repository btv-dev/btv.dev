"use client";

import { motion } from "framer-motion";
import { Search, Edit3, Code } from "lucide-react";
import { MotionH2, MotionParagraph } from "../ui/motion-typography";

const steps = [
  {
    title: "Discover",
    description:
      "We start by diving deep into your goals, brand personality, and design preferences.",
    icon: Search,
  },
  {
    title: "Sketch & Brainstorm",
    description:
      "We sketch ideas on paper and create mockups, visualizing potential directions and refining concepts before moving forward.",
    icon: Edit3,
  },
  {
    title: "Build",
    description:
      "Bringing designs to life, we begin development to craft a site that exceeds expectations.",
    icon: Code,
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const OurApproach = () => {
  return (
    <section id="Our-Approach" className="my-16 px-4">
      <MotionH2
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        Our Approach
      </MotionH2>

      <MotionParagraph
        className="text-center mb-8"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        At BTV.dev, our collaborative process ensures your vision comes to
        life—beautifully and seamlessly.
      </MotionParagraph>

      <div className="flex flex-wrap justify-center gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-80"
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Icon className="text-btv-blue-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-center text-gray-600">{step.description}</p>
            </motion.div>
          );
        })}
      </div>

      <MotionParagraph
        className="text-center mt-8 mx-auto max-w-2xl"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Through sketches and mockups, we explore various possibilities and steer
        the project in the right direction before committing to the final
        design, ensuring our work aligns perfectly with your vision.
      </MotionParagraph>
    </section>
  );
};

export default OurApproach;
