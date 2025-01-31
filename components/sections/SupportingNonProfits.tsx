"use client";

import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { motion } from "framer-motion";
import NextImage from "next/image";
import redCrossImage from "../../public/images/red-cross.webp";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.32, 0.23, 0, 1]
    }
  }
};


const MotionImage = motion(NextImage);

export function SupportingNonProfits() {
  return (
    <Section id="NonProfits">
      <H2>Supporting Non-Profits</H2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          We are passionate about empowering mission-driven organizations.
          Your cause deserves a digital presence that reflects its heart and
          impact.
        </Paragraph>
        <MotionImage
          className="w-full h-auto rounded-xl md:rounded-[7rem] mx-auto my-24"
          src={redCrossImage}
          alt="James working with the red cross"
          placeholder="blur"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2
          }}
          variants={fadeUpVariant}
        />
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          Understanding the challenges you face, we offer special discounts
          and tailored solutions.
        </Paragraph>
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          Let's create something <em>remarkable</em> together.
        </Paragraph>
      </motion.div>
    </Section>
  );
}
