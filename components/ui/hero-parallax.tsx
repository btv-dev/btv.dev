"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { StaticImageData } from "next/image";
import { H2, Paragraph } from "./typography";
import { staggerContainer, fadeUpVariant } from "@/lib/animations";
import SafariFrame from "./safari-frame";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: StaticImageData;
  }[];
}) => {
  const [rows, setRows] = React.useState({
    firstRow: products.slice(0, 4),
    secondRow: products.slice(4, 8),
    thirdRow: [] as typeof products,
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        // Desktop layout - two rows with 4 items each
        setRows({
          firstRow: products.slice(0, 4),
          secondRow: products.slice(4, 8),
          thirdRow: []
        });
      } else {
        // Mobile layout - three rows with fewer items
        setRows({
          firstRow: products.slice(0, 3),
          secondRow: products.slice(3, 6),
          thirdRow: products.slice(5, 8)
        });
      }
    };

    // Initial check
    handleResize(mediaQuery);

    // Add listener for subsequent changes
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [products]);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, -100]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="pt-[45rem] mb-[-6rem] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {rows.firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {rows.secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {rows.thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer}
      className="relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0 min-h-[40rem] max-w-4xl px-4"
    >
      <H2 variants={fadeUpVariant} useParentAnimation>Our Work</H2>
      <Paragraph className="mb-10" variants={fadeUpVariant} useParentAnimation>
        We help you attract and retain clients by ensuring your website is expressive, fast, and communicates your brand.
      </Paragraph>
    </motion.div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: StaticImageData;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative flex-shrink-0 w-full max-w-[30rem] md:max-w-[40rem] pb-5"
    >
      <div className="relative w-full pt-12">
        <SafariFrame src={product.thumbnail} urlText={product.title} />
      </div>
    </motion.div>
  );
};
