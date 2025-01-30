"use client";

import React from 'react';
import { motion, useInView, HTMLMotionProps } from "framer-motion";
import { H2, H3, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";
import { AnimatedButton } from "../ui/animated-button";
import { useRef } from "react";
import { LayoutPanelTopIcon } from "../ui/layout-panel-top";
import { ShieldCheckIcon } from "../ui/shield-check";
import { GaugeIcon } from "../ui/gauge";
import { SearchIcon } from "../ui/search";
import { WaypointsIcon } from "../ui/waypoints";
import { FileStackIcon } from "../ui/file-stack";
import { TrendingUpIcon } from "../ui/trending-up";
import { SquarePenIcon } from "../ui/square-pen";
import { Heart } from "lucide-react";

interface FeatureCardProps extends Omit<HTMLMotionProps<"div">, "title"> {
  title: string;
  description: string;
  icon: React.ReactNode;
  isVisible?: boolean;
}

const FeatureCard = ({ title, description, icon, ...props }: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5 // requires 30% of the card to be visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="relative p-4 border rounded-lg shadow-md flex flex-col justify-center"
      {...props}
    >
      {React.cloneElement(icon as React.ReactElement, { isVisible: isInView })}
      <H3 noAnimation className="font-bold text-center mt-4">{title}</H3>
      <Paragraph noAnimation className="text-sm text-muted-foreground">{description}</Paragraph>
    </motion.div>
  );
};

const features = [
  {
    title: "Responsive Design & Animations",
    description:
      "Engaging, mobile-friendly layouts with subtle animations to enhance user experience.",
    icon: LayoutPanelTopIcon,
  },
  {
    title: "Security Features",
    description:
      "Built-in protection against vulnerabilities on the web, SSL integration, and secure data handling.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Performance Optimization",
    description:
      "Advanced caching, code splitting, and bundle optimization for lightning-fast load times.",
    icon: GaugeIcon,
  },
  {
    title: "SEO Tools",
    description:
      "Out-of-the-box SEO-friendly markup, meta tag management, and structured data to boost visibility.",
    icon: SearchIcon,
  },
  {
    title: "Contact Forms & Social Sharing",
    description:
      "Easy-to-use contact forms and social media integration to engage visitors and streamline communication.",
    icon: WaypointsIcon,
  },
  {
    title: "Asset Optimization",
    description:
      "Automated image compression and lazy loading for faster page loads and improved performance.",
    icon: FileStackIcon,
  },
  {
    title: "Analytics Integration",
    description:
      "Setup for tracking user interactions, helping you make data-driven decisions.",
    icon: TrendingUpIcon,
  },
  {
    title: "Integrated Blog & CMS",
    description:
      "A simple, built-in content management system allowing effortless content updates and blog posts.",
    icon: SquarePenIcon,
  },
];

const HeartIcon = () => (
  <motion.div
    className="inline-block px-1"
    animate={{
      scale: [1, 1.25, 1, 1.15, 1],
      rotate: [0, 2, 0, 2, 0],
    }}
    style={{
      position: 'relative',
      top: '7px'
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      times: [0, 0.15, 0.25, 0.35, 1],
      ease: [0.32, 0, 0.67, 0],
      repeatType: "loop"
    }}
  >
    <Heart className="text-btv-blue fill-btv-blue" size={25} />
  </motion.div>
);

export function WorkAndFeatures() {

  return (
    <Section id="Work-And-Features">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <H2 variants={fadeUpVariant} useParentAnimation>Services</H2>
        <Paragraph className="mb-10 md:mb-14" variants={fadeUpVariant} useParentAnimation>
          We create digital experiences that captivate and convert, and we deliver according to your specific needs. Here are a few of the services our clients <HeartIcon /> :
        </Paragraph>
      </motion.div>

      <div className="flex flex-col gap-6">
        {/* Row container - using flex with stretch alignment */}
        <div className="flex flex-wrap items-stretch gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex w-full sm:flex-1 min-w-[280px]">
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={<Icon className="text-btv-blue" size={44} />}
                />
              </div>
            );
          })}
        </div>
      </div>
      <AnimatedButton className="mt-20" variant="fullWidth" href="#Lets-Talk">
        Let's talk!
      </AnimatedButton>
    </Section>
  );
}
