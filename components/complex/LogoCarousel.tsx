"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export interface Logo {
  name: string;
  id: number;
  img: string;
}

interface LogoColumnProps {
  logos: Logo[];
  index: number;
  currentTime: number;
  speed: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray([...allLogos]);
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);

  // Keep track of the last used logo in each row
  const getLastUsedInRow = (rowIndex: number): Logo | null => {
    for (let col = columnCount - 1; col >= 0; col--) {
      if (columns[col][rowIndex]) {
        return columns[col][rowIndex];
      }
    }
    return null;
  };

  // Fill columns while avoiding adjacent duplicates
  let currentRow = 0;
  let availableLogos = [...shuffled];

  while (
    availableLogos.length > 0 &&
    columns.some((col) => col.length < Math.ceil(shuffled.length / columnCount))
  ) {
    for (let col = 0; col < columnCount; col++) {
      if (columns[col].length <= currentRow) {
        const lastUsedLogo = getLastUsedInRow(currentRow);

        // Filter out the logo that was just used in the previous column
        let validLogos = availableLogos.filter((logo) => logo !== lastUsedLogo);

        // If we have no valid logos left, reset available logos while keeping restrictions
        if (validLogos.length === 0) {
          validLogos = shuffleArray(
            allLogos.filter((logo) => logo !== lastUsedLogo)
          );
        }

        // Select and place a logo
        const selectedLogo =
          validLogos[Math.floor(Math.random() * validLogos.length)];
        columns[col].push(selectedLogo);

        // Remove the used logo from available logos
        availableLogos = availableLogos.filter((logo) => logo !== selectedLogo);
      }
    }
    currentRow++;
  }

  // Ensure all columns have the same length
  const maxLength = Math.max(...columns.map((col) => col.length));
  columns.forEach((col) => {
    while (col.length < maxLength) {
      // Find valid logos for padding (avoiding adjacent duplicates)
      const lastUsedLogo = col[col.length - 1];
      const validLogos = shuffled.filter((logo) => logo !== lastUsedLogo);
      col.push(validLogos[Math.floor(Math.random() * validLogos.length)]);
    }
  });

  return columns;
};

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime, speed }) => {
    const cycleInterval = speed;
    const columnDelay = index * 200;
    const adjustedTime =
      (currentTime + columnDelay) % (cycleInterval * logos.length);
    const currentIndex = Math.floor(adjustedTime / cycleInterval);
    const currentLogoUrl = useMemo(
      () => logos[currentIndex].img,
      [logos, currentIndex]
    );

    return (
      <motion.div
        className="relative h-32 w-full overflow-hidden md:h-48 justify-center flex"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
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
              src={currentLogoUrl}
              height={160}
              width={160}
              alt={logos[currentIndex].name}
              className="h-32 w-32 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32"
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
  const [logoSets, setLogoSets] = useState<Logo[][]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100);
  }, []);

  const isBase =
    typeof window !== "undefined" && window.innerWidth > 640 ? false : true;
  const columnCount = isBase ? 2 : 3;

  const speed = isBase ? 2500 : 4000;

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount);
    setLogoSets(distributedLogos);
  }, [logos, columnCount]);

  return (
    <div className="flex space-x-4">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
          speed={speed}
        />
      ))}
    </div>
  );
}

export { LogoColumn };
