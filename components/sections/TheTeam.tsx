"use client";

import NextImage from "next/image";
import { H2, H3, Paragraph } from "@/components/ui/typography";
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

export function TheTeam() {
  return (
    <Section id="The-Team">
      <H2>The Team</H2>
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
        <Paragraph className="mb-8" variants={fadeUpVariant} useParentAnimation>
          We're friends, brothers, & developers.
        </Paragraph>
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={fadeUpVariant}
        >
          {/* James */}
          <div className="space-y-4 text-center">
            <NextImage
              width={160}
              height={160}
              className="w-40 h-40 rounded-full mx-auto"
              src="/images/james.webp"
              alt="Headshot of James Mitofsky"
            />
            <H3 className="font-semibold" variants={fadeUpVariant} useParentAnimation>James Mitofsky</H3>
            <Paragraph className="md:text-md text-justify" variants={fadeUpVariant} useParentAnimation>
              With a bachelor's in Computer Science from CESI, a French
              engineering school, James is a design enthusiast with a passion
              for understanding user behavior. James enjoys
              learning languages, running through the countryside, and advocating for social issues.
            </Paragraph>
          </div>
          {/* Kyle */}
          <div className="space-y-4 text-center">
            <NextImage
              width={160}
              height={160}
              className="w-40 h-40 rounded-full mx-auto"
              src="/images/kyle.webp"
              alt="Headshot of Kyle Mitofsky"
            />
            <H3 className="font-semibold" variants={fadeUpVariant} useParentAnimation>Kyle Mitofsky</H3>
            <Paragraph className="md:text-md text-justify" variants={fadeUpVariant} useParentAnimation>
              Possessing a master's in Managing Information Science from
              Champlain College, Kyle is a knowledge sharer who thrives on
              educating and empowering. Proud owner of three black cats, a
              dog, and multiple laptops, Kyle brings a unique blend of
              expertise and personality.
            </Paragraph>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
