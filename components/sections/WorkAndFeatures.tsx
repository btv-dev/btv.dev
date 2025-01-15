"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid, // for Responsive Design & Animations
  Search, // for SEO Tools
  MessageSquare, // for Contact Forms & Social Sharing
  Image as ImageIcon, // for Image Optimization & Lazy Loading
  TrendingUp, // for Analytics Integration
  FileText, // for Integrated Blog & CMS
} from "lucide-react";
import { H3 } from "../ui/typography";
import { MotionH2, MotionParagraph } from "../ui/motion-typography";
import { Section } from "../ui/layout";

const features = [
  {
    title: "Responsive Design & Animations",
    description:
      "Engaging, mobile-friendly layouts with subtle animations to enhance user experience.",
    icon: LayoutGrid,
  },
  {
    title: "SEO Tools",
    description:
      "Out-of-the-box SEO-friendly markup, meta tag management, and structured data to boost visibility.",
    icon: Search,
  },
  {
    title: "Contact Forms & Social Sharing",
    description:
      "Easy-to-use contact forms and social media integration to engage visitors and streamline communication.",
    icon: MessageSquare,
  },
  {
    title: "Image Optimization & Lazy Loading",
    description:
      "Automated image compression and lazy loading for faster page loads and improved performance.",
    icon: ImageIcon,
  },
  {
    title: "Analytics Integration",
    description:
      "Setup for tracking user interactions, helping you make data-driven decisions.",
    icon: TrendingUp,
  },
  {
    title: "Integrated Blog & CMS",
    description:
      "A simple, built-in content management system allowing effortless content updates and blog posts.",
    icon: FileText,
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const WorkAndFeatures = () => {
  return (
    <Section id="Work-&-Features" fade="all">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.15 }}
      >
        <MotionH2 variants={headerVariants}>Work & Features</MotionH2>
        <MotionParagraph
          className="mb-10"
          variants={headerVariants}
          transition={{ delay: 0.1 }}
        >
          We don't just build websites; we create digital experiences that
          captivate and convert. We deliver according to your needs, and here
          are some features our clients love:
        </MotionParagraph>

        <div className="flex flex-col gap-6">
          {/* Row container */}
          <div className="flex flex-wrap gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="w-full sm:flex-1 min-w-[280px]">
                  <motion.div
                    className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg h-full"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-btv-blue-500 mb-4" size={48} />
                    <H3>{feature.title}</H3>
                    <p className="text-center text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export { WorkAndFeatures };
