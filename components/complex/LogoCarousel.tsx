"use client";

import React, { useCallback, useEffect, useState } from "react";
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
  columnCount: number;
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime, speed, columnCount }) => {
    // Add column-based offset for logo selection
    const logoOffset = index * Math.ceil(logos.length / columnCount);
    // Add time delay between columns (200ms between each column)
    const timeOffset = index * 200;
    const adjustedTime = (currentTime + timeOffset + logoOffset * speed) % (speed * logos.length);
    const currentIndex = Math.floor(adjustedTime / speed) % logos.length;

    const currentLogo = logos[currentIndex];

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
            key={`${currentLogo.id}-${currentIndex}`}
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
  const [columnCount, setColumnCount] = useState(3); // Default to desktop view
  const [speed, setSpeed] = useState(4000); // Default to desktop speed

  // Handle responsive layout after mount
  useEffect(() => {
    const handleResize = () => {
      const isBase = window.innerWidth <= 640;
      setColumnCount(isBase ? 2 : 3);
      setSpeed(isBase ? 2500 : 4000);
    };

    // Set initial values
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  return (
    <div className="flex space-x-4">
      {Array.from({ length: columnCount }).map((_, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
          speed={speed}
          columnCount={columnCount}
        />
      ))}
    </div>
  );
}
