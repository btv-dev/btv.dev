"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export interface Logo {
  name: string;
  id: number;
  img: string;
  width: number;
  height: number;
}

const isSignificantlyWider = (logo: Logo): boolean => {
  // Only consider it wide if width is at least 10% greater than height
  return logo.width > logo.height * 1.1;
};

const COLUMN_COUNT = 3;

const createLogoSets = (logos: Logo[]): Logo[][] => {
  const wideLogos = logos.filter(isSignificantlyWider);
  const tallLogos = logos.filter(logo => !isSignificantlyWider(logo));
  const sets: Logo[][] = [];

  // If we have both wide and tall logos, create alternating arrangements
  if (wideLogos.length > 0 && tallLogos.length > 0) {
    let wideIndex = 0;
    let tallIndex = 0;

    while (wideIndex < wideLogos.length && tallIndex < tallLogos.length) {
      // First arrangement: wide logos on sides, tall in middle
      if (wideIndex + 1 < wideLogos.length && tallIndex < tallLogos.length) {
        sets.push([
          wideLogos[wideIndex],
          tallLogos[tallIndex],
          wideLogos[wideIndex + 1]
        ]);
        wideIndex += 2;
        tallIndex += 1;
      }

      // Second arrangement: tall logos on sides, wide in middle
      if (wideIndex < wideLogos.length && tallIndex + 1 < tallLogos.length) {
        sets.push([
          tallLogos[tallIndex],
          wideLogos[wideIndex],
          tallLogos[tallIndex + 1]
        ]);
        wideIndex += 1;
        tallIndex += 2;
      }
    }
  }

  // If we don't have enough logos for the special arrangements,
  // or if we've used all the special combinations,
  // add regular sequential sets
  if (sets.length === 0) {
    for (let i = 0; i < logos.length - 2; i++) {
      sets.push([
        logos[i % logos.length],
        logos[(i + 1) % logos.length],
        logos[(i + 2) % logos.length]
      ]);
    }
  }

  return sets;
};

interface LogoColumnProps {
  index: number;
  currentSet: Logo[];
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ index, currentSet }) => {
    // Safety check for valid logo
    if (!currentSet || index >= currentSet.length) {
      return null;
    }
    
    const currentLogo = currentSet[index];
    // Reverse the animation delay to go right-to-left
    const animationDelay = ((COLUMN_COUNT - 1) - index) * 0.1;

    return (
      <motion.div
        className="relative h-32 w-full overflow-hidden md:h-48 justify-center flex"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: animationDelay,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLogo.id}-${index}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
                delay: animationDelay,
              },
            }}
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <Image
              src={currentLogo.img}
              height={160}
              width={160}
              alt={currentLogo.name}
              className="h-32 w-32 max-h-[60%] max-w-[90%] object-contain md:h-full md:w-auto"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
);

LogoColumn.displayName = "LogoColumn";

interface LogoCarouselProps {
  logos: Logo[];
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [logoSets, setLogoSets] = useState<Logo[][]>([]);
  const ANIMATION_SPEED = 4000;
  const COLUMN_DELAY = 200; // 200ms delay between columns

  // Create initial set immediately
  useEffect(() => {
    if (logos.length >= COLUMN_COUNT) {
      const initialSets = createLogoSets(logos);
      setLogoSets(initialSets);
    }
  }, [logos]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(prev => prev + 100);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const getSetForColumn = (index: number) => {
    if (logos.length < COLUMN_COUNT || !logoSets.length) {
      return [];
    }

    const reverseIndex = (COLUMN_COUNT - 1) - index;
    const adjustedTime = Math.max(0, currentTime - (reverseIndex * COLUMN_DELAY));
    const currentSetIndex = Math.floor(adjustedTime / ANIMATION_SPEED) % logoSets.length;
    return logoSets[currentSetIndex];
  };

  if (logos.length < COLUMN_COUNT) {
    return null;
  }

  return (
    <div className="flex space-x-4">
      {Array.from({ length: COLUMN_COUNT }).map((_, index) => (
        <LogoColumn
          key={index}
          index={index}
          currentSet={getSetForColumn(index)}
        />
      ))}
    </div>
  );
}
