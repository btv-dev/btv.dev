"use client";

import { staggerContainer, fadeUpVariant } from "@/lib/animations";
import { motion } from "framer-motion";
import { Section } from "../ui/layout";
import { H2, Paragraph } from "../ui/typography";
import ImageStepper from "../ui/image-stepper";

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const OurApproach = () => {
  return (
    <Section id="Our-Approach" className="mt-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer}
      >
        <H2 variants={fadeUpVariant} useParentAnimation>Our Approach</H2>
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          At BTV.dev, our collaborative process ensures your vision comes to
          life—beautifully and seamlessly. Here's how we do it:
        </Paragraph>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-6">
        <ImageStepper />
      </div>

      <Paragraph
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
      </Paragraph>
    </Section>
  );
};

export default OurApproach;