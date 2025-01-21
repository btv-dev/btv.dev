"use client";

import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { motion } from "framer-motion";

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
    <Section id="NonProfits" fade="all">
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
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          Understanding the challenges you face, we offer special discounts
          and tailored solutions.
        </Paragraph>
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          Let's create something remarkable together.
          <a
            href="mailto:hey@btv.dev"
            className="ml-2 text-btv-blue-500 hover:text-btv-blue-600 underline"
          >
            Let's talk!
          </a>
        </Paragraph>
      </motion.div>
    </Section>
  );
}
