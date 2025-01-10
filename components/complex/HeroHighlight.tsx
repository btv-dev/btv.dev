"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { AnimatedLogo } from "./AnimatedLogo";

export function HeroHighlightImplemented() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-3xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        <AnimatedLogo />A web design and development agency crafting digital
        solutions that{" "}
        <Highlight className="text-black dark:text-white">reflect</Highlight>{" "}
        your values and{" "}
        <Highlight delay={1.4} className="text-black dark:text-white">
          amplify
        </Highlight>{" "}
        your mission.
      </motion.h1>
    </HeroHighlight>
  );
}
