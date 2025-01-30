"use client";

import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { CustomLink } from "../ui/custom-link";
import { AnimatedButton } from "../ui/animated-button";
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
        <NextImage
          className="w-full h-auto rounded-sm mx-auto mt-8"
          src={redCrossImage}
          alt="James working with the red cross"
          placeholder="blur"
        />
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          Understanding the challenges you face, we offer special discounts
          and tailored solutions.
        </Paragraph>
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          Let's  <CustomLink href="#Lets-Talk">
            create something remarkable 
          </CustomLink> together.
        </Paragraph>
        <motion.div 
          variants={fadeUpVariant}
          className="flex flex-col items-end"
        >
          <AnimatedButton
            href="#Lets-Talk"
            className="mt-8"
          >
            Let's Talk
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </Section>
  );
}
