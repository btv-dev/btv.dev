"use client";

import NextImage from "next/image";
import { H2, H3, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { motion } from "framer-motion";
import kyleLectureImage from "../../public/images/kyle-lecture.webp";
import jamesImage from "../../public/images/james.webp";
import kyleImage from "../../public/images/kyle.webp";

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
    <Section id="About">
      <H2>About</H2>
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
          Named after Vermont's international airport code (<span className="font-rubik-mono-one text-btv-blue">BTV</span>), we are a boutique software development studio with roots in Burlington, Vermont. We specialize in crafting expressive, user-focused web applications and digital solutions that blend technical excellence with intuitive design. Our approach combines Vermont's values of authenticity and craftsmanship with modern development practices.
        </Paragraph>
        <NextImage
          width={800}
          height={400}
          className="w-full h-auto rounded-sm mx-auto"
          src={kyleLectureImage}
          alt="Kyle delivering a code talk"
          placeholder="blur"
        />
        <Paragraph className="mb-8" variants={fadeUpVariant} useParentAnimation>
          We're friends, brothers, & developers. With 24 years of experience between us, we share a passion for creating exceptional digital experiences.
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
              src={jamesImage}
              alt="Headshot of James Mitofsky"
              placeholder="blur"
            />
            <H3 className="font-semibold" variants={fadeUpVariant} useParentAnimation>James Mitofsky</H3>
            <Paragraph className="md:text-md text-justify" variants={fadeUpVariant} useParentAnimation>
              Diplomaed in Computer Science from CESI, a French
              engineering school, James is a design enthusiast with a passion
              for understanding user behavior. When not coding, he is an avid runner, outdoorist, and advocate for social issues.
            </Paragraph>
          </div>
          {/* Kyle */}
          <div className="space-y-4 text-center">
            <NextImage
              width={160}
              height={160}
              className="w-40 h-40 rounded-full mx-auto"
              src={kyleImage}
              alt="Headshot of Kyle Mitofsky"
              placeholder="blur"
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
