"use client";

import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { LogoCarousel } from "@/components/complex/LogoCarousel";
import { motion } from "framer-motion";
import { clientLogos } from "./client-logos";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function TheyTrustUs() {
  return (
    <Section id="They-Trust-Us" className="mb-0">
      <H2>They Trust Us</H2>
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Paragraph className="max-w-xl mb-12">
          We&apos;re proud to work with a diverse range of clients, from local
          artisans to international organizations. Each project is an opportunity
          to create something unique and impactful.
        </Paragraph>
      </motion.div>
      <LogoCarousel logos={clientLogos} />
    </Section>
  );
}
