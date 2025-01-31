"use client";

import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { motion } from "framer-motion";
import NextImage from "next/image";
import kyleLectureImage from "../../public/images/kyle-lecture.webp";
import jamesWorking from "../../public/images/james-working.webp";

const MotionImage = motion(NextImage);

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

export function About() {
  return (
    <Section id="About" fade="all" >
      <H2>A Design Agency</H2>
      <MotionImage
        className="w-full h-auto rounded-xl md:rounded-[7rem] mx-auto mb-24"
        src={jamesWorking}
        alt="James writing code"
        placeholder="blur"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2
        }}
        variants={fadeUpVariant}
      />
      <Paragraph className="mb-8">
        Rooted in Burlington and named for Vermont's international airport code (<span className="font-rubik-mono-one text-btv-blue">BTV</span>), we're a digital brand studio where technical mastery meets creative vision.
      </Paragraph>
      <Paragraph className="mb-8">
        Our development expertise (<span className="font-rubik-mono-one text-btv-blue">.DEV</span>) lets us push creative boundaries while ensuring everything we craft works beautifully. All of our leadership has a technical background, and we are committed to providing bespoke designs that drive results.
      </Paragraph>
      <MotionImage
        className="w-full h-auto rounded-xl md:rounded-[7rem] mx-auto my-24"
        src={kyleLectureImage}
        alt="Kyle delivering a code talk"
        placeholder="blur"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2
        }}
        variants={fadeUpVariant}
      />
      <Paragraph className="mb-8">
        We specialize in crafting expressive digital experiences and websites that blend technical excellence with intuitive design, and our approach combines Vermont's values of authenticity and craftsmanship with modern development practices.
      </Paragraph>
    </Section>
  );
}
