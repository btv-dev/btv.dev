"use client";

import { useRef, useState } from "react";
import { CanvasDot } from "./CanvasDot";
import { motion, useMotionValue } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import Image from "next/image";
import heroImage from "../../public/images/church-street.webp";

// Animation timing constants (in seconds)
const TIMING = {
  BASE_UNIT: 0.3,
  TITLE: {
    START: 0.2,
    DURATION: 0.5,
    MOVE: 1.2,
    MOVE_DURATION: 0.8,
  },
  DOT: {
    START_SHRINK: 0.6,
    DURATION: 0.3,
  },
  SUBTITLE: {
    START: 2.2,
    DURATION: 0.9,
  },
  HIGHLIGHTS: {
    FIRST: 3.1,
    SECOND: 4.3, // have a gap from first one because of text and then sequence of close 234
    THIRD: 5.2,
    FOURTH: 6.1
  }
} as const;

export function HeroHighlightImplemented() {
  const heroHighlightRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLHeadingElement>(null);
  const y = useMotionValue(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <HeroHighlight ref={heroHighlightRef}>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white/70" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
          <Image
            src={heroImage}
            alt="Church Street in Burlington, Vermont"
            fill
            className="object-cover -z-10"
            priority
            placeholder="blur"
            loading="eager"
            onLoad={() => {
              setTimeout(() => setIsImageLoaded(true), 500);
            }}
          />
        </div>
        {isImageLoaded && (
          <>
            <CanvasDot
              heroRef={heroHighlightRef}
              dotRef={dotRef}
              yMotionValue={y}
            />
            <motion.div
              initial={{
                opacity: 0,
                y: 0,
              }}
              animate={{
                opacity: 1,
                y: -120, // Move up to make space for subtitle
              }}
              style={{ y }}
              transition={{
                opacity: {
                  duration: TIMING.TITLE.DURATION,
                  ease: [0.4, 0.0, 0.2, 1],
                  delay: TIMING.TITLE.START,
                },
                y: {
                  delay: TIMING.TITLE.MOVE,
                  duration: TIMING.TITLE.MOVE_DURATION,
                  ease: [0.4, 0.0, 0.2, 1],
                }
              }}
              className="flex flex-col items-center justify-center gap-5"
            >
              <h1 className="font-rubik-mono-one text-7xl text-gray-800 leading-none m-0">
                BTV
              </h1>
              <motion.h1
                ref={dotRef}
                className="font-rubik-mono-one text-7xl text-btv-blue leading-none m-0"
                initial={{ scale: 1 }}
                animate={{ scale: 0 }}
                transition={{
                  delay: TIMING.DOT.START_SHRINK,
                  duration: TIMING.DOT.DURATION,
                  ease: "easeIn"
                }}
                style={{ transformOrigin: "center center" }}
              >
                DOT
              </motion.h1>
              <h1 className="font-rubik-mono-one text-7xl text-gray-800 leading-none m-0">
                dev
              </h1>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: TIMING.SUBTITLE.DURATION,
                ease: [0.4, 0.0, 0.2, 1],
                delay: TIMING.SUBTITLE.START
              }}
              className="text-2xl px-4 md:text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto mt-8"
            >
              We help{" "}
              <Highlight delay={TIMING.HIGHLIGHTS.FIRST} className="dark:text-white">
                passionate organizations
              </Highlight>
              {" "}strengthen their impact through strategic digital{" "}
              <Highlight delay={TIMING.HIGHLIGHTS.SECOND} className="dark:text-white">
                design,
              </Highlight>
              {" "}
              <Highlight delay={TIMING.HIGHLIGHTS.THIRD} className="dark:text-white">
                branding,
              </Highlight>
              {" "}and{" "}
              <Highlight delay={TIMING.HIGHLIGHTS.FOURTH} className="dark:text-white">
                content
              </Highlight>
              .
            </motion.div>
          </>
        )}
      </HeroHighlight>
    </>
  );
}
