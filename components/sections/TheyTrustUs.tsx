"use client";

import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { Logo, LogoCarousel } from "@/components/complex/LogoCarousel";
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

interface TheyTrustUsProps {
  logos: Logo[];
}

export function TheyTrustUs({ logos }: TheyTrustUsProps) {
  return (
    <Section id="They-Trust-Us" className="mb-0">
      <H2>They Trust Us</H2>
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
        <Paragraph className="mb-12 sm:mb-18" variants={fadeUpVariant} useParentAnimation>
          Our clients span various industries, each trusting us to bring their
          digital visions to life.
        </Paragraph>
        <motion.div variants={fadeUpVariant}>
          <LogoCarousel logos={logos} />
        </motion.div>
      </motion.div>
    </Section>
  );
}
