"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { useRef } from "react";
import { CanvasDot } from "./CanvasDot";

export function HeroHighlightImplemented() {
  const heroHighlightRef = useRef<HTMLDivElement>(null);
  const btvRef = useRef<HTMLHeadingElement>(null);
  const devRef = useRef<HTMLHeadingElement>(null);

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
          <div className="flex flex-col gap-20 mb-32">
            <h1
              ref={btvRef}
              className="font-rubik-mono-one text-5xl text-gray-800 leading-none m-0"
            >
              BTV
            </h1>
            <CanvasDot
              parentRef={heroHighlightRef}
              btvRef={btvRef}
              devRef={devRef}
            />
            <h1
              ref={devRef}
              className="font-rubik-mono-one text-5xl text-gray-800 leading-none m-0"
            >
              dev
            </h1>
          </div>
          A Vermont based web design agency, we develop solutions that{" "}
          <Highlight delay={0.5} className="dark:text-white">
            reflect your values
          </Highlight>{" "}
           and{" "}
          <Highlight delay={1.5} className="dark:text-white">
            amplify your mission
          </Highlight>
          .
        </motion.h1>
      </HeroHighlight>
    </>
  );
}
