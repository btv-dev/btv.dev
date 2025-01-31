"use client";

import React from 'react';
import { motion, useInView, HTMLMotionProps } from "framer-motion";
import { H2, H3, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";
import { AnimatedButton } from "../ui/animated-button";
import { useRef } from "react";
import { PaletteIcon, MonitorSmartphoneIcon, VideoIcon, ShareIcon, Heart, LucideIcon } from "lucide-react";
import { ClapIcon } from '../ui/animated-icons/movie-clap';

interface ServiceCardProps extends Omit<HTMLMotionProps<"div">, "title"> {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  features, 
  icon: Icon, 
  ...props 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="relative p-6 border rounded-lg shadow-md flex flex-col justify-start h-full"
      {...props}
    >
      <Icon 
        className="text-btv-blue mb-4"
        size={44}
        isVisible={isInView}
      />
      <H3 noAnimation className="font-bold mb-3">{title}</H3>
      <Paragraph noAnimation className="text-muted-foreground mb-4">{description}</Paragraph>
      <ul className="text-sm text-muted-foreground space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const services: Service[] = [
  {
    title: "Brand Identity & Design",
    description: "Creating visual languages that express your values and approach with intention.",
    icon: PaletteIcon,
    features: [
      "Logo design and visual identity systems",
      "Brand guidelines and style documentation",
      "Typography and color strategy",
      "Visual asset creation"
    ]
  },
  {
    title: "Digital Experience Design",
    description: "Crafting intuitive, performance-focused websites and applications that serve your goals.",
    icon: MonitorSmartphoneIcon,
    features: [
      "Custom website and application development",
      "Responsive, mobile-first experiences",
      "Performance optimization and security",
      "Content management systems"
    ]
  },
  {
    title: "Motion & Animation",
    description: "Adding dimension to your story through thoughtful movement and interaction.",
    icon: ClapIcon,
    features: [
      "Brand animation and motion graphics",
      "Interactive user experience elements",
      "Micro-interactions and transitions",
      "Animated product demonstrations"
    ]
  },
  {
    title: "Digital Presence Strategy",
    description: "Ensuring your story is told consistently across all digital touchpoints.",
    icon: ShareIcon,
    features: [
      "Social media presence optimization",
      "Business listing management",
      "Content strategy and planning",
      "Analytics and performance tracking"
    ]
  }
];

const HeartIcon: React.FC = () => (
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

export function WorkAndFeatures(): JSX.Element {
  return (
    <Section id="Work-And-Features">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <H2 variants={fadeUpVariant} useParentAnimation>Our Services</H2>
        <Paragraph className="mb-10 md:mb-14" variants={fadeUpVariant} useParentAnimation>
          We help quality-focused organizations express themselves in the digital world. Here's how we can bring your vision to life <HeartIcon />
        </Paragraph>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            features={service.features}
            icon={service.icon}
          />
        ))}
      </div>

      <AnimatedButton className="mt-20" variant="fullWidth" href="#Lets-Talk">
        Let's explore how we can help
      </AnimatedButton>
    </Section>
  );
}