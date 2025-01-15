"use client";

import { useRef } from "react";
import { CanvasDot } from "./CanvasDot";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { VisualDot } from "./VisualDot";

// Animation timing constants (in seconds)
const TIMING = {
  BASE_UNIT: 0.3,
  DOT: {
    START_SHRINK: 0.6,
    DURATION: 0.3,
  },
  SUBTITLE: {
    START: 1.2,
    DURATION: 0.9,
  },
  HIGHLIGHTS: {
    FIRST: 2.1,
    SECOND: 3.0,
  }
} as const;

export function HeroHighlightImplemented() {
  const heroHighlightRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <HeroHighlight ref={heroHighlightRef}>
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
          className="text-2xl px-4 md:text-2xl lg:text-3xl font-bold text-neutral-700 dark:text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto"
        >
          {/* !!! Removed relative from below to get dot canvas to take up everything */}
          <div className="flex flex-col gap-5 mb-32">
            <h1
              className="font-rubik-mono-one text-7xl text-gray-800 leading-none m-0"
            >
              BTV
            </h1>
            {/* <CanvasDot
              parentRef={heroHighlightRef}
              dotRef={dotRef}
            /> */}
            <VisualDot
              targetRef={dotRef}
            />
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
            <h1
              className="font-rubik-mono-one text-7xl text-gray-800 leading-none m-0"
            >
              dev
            </h1>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: TIMING.SUBTITLE.DURATION,
              ease: [0.4, 0.0, 0.2, 1],
              delay: TIMING.SUBTITLE.START
            }}
            className="text-2xl px-4 md:text-2xl lg:text-3xl font-bold text-neutral-700 dark:text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto"
          >
            A Vermont based web design agency, we develop solutions that{" "}
            <Highlight delay={TIMING.HIGHLIGHTS.FIRST} className="dark:text-white">
              reflect your values
            </Highlight>{" "}
            and{" "}
            <Highlight delay={TIMING.HIGHLIGHTS.SECOND} className="dark:text-white">
              amplify your mission
            </Highlight>
            .
          </motion.div>
        </motion.h1>
      </HeroHighlight>
    </>
  );
}
