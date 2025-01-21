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

export function LetsTalk() {
  return (
    <Section id="Lets-Talk" fade="top" innerClassname="pb-0">
      <H2>Let's Talk!</H2>
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
          Ready to transform your vision into reality? We're here to listen,
          collaborate, and innovate.
        </Paragraph>
        <Paragraph variants={fadeUpVariant} useParentAnimation>
          Reach out at{" "}
          <a
            href="mailto:hey@btv.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-btv-blue-500 hover:text-btv-blue-600 underline"
          >
            hey@btv.dev
          </a>
          . We're eager to discuss how we can help you improve your presence
          on the web.
        </Paragraph>
        <footer id="footer" className="text-center mt-12 md:mt-16 mb-6 text-sm text-gray-500">
          &copy; 2020 – {new Date().getFullYear()} BTV.dev. All rights reserved.
        </footer>
      </motion.div>
    </Section>
  );
}
