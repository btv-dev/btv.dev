"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid, // for Responsive Design & Animations
  Search, // for SEO Tools
  MessageSquare, // for Contact Forms & Social Sharing
  Image as ImageIcon, // for Image Optimization & Lazy Loading
  TrendingUp, // for Analytics Integration
  FileText, // for Integrated Blog & CMS
  Shield, // for Security Features
  Zap, // for Performance Optimization
} from "lucide-react";
import { H2, H3, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const features = [
  {
    title: "Responsive Design & Animations",
    description:
      "Engaging, mobile-friendly layouts with subtle animations to enhance user experience.",
    icon: LayoutGrid,
  },
  {
    title: "Security Features",
    description:
      "Built-in protection against vulnerabilities on the web, SSL integration, and secure data handling.",
    icon: Shield,
  },
  {
    title: "Performance Optimization",
    description:
      "Advanced caching, code splitting, and bundle optimization for lightning-fast load times.",
    icon: Zap,
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

export function WorkAndFeatures() {
  return (
    <Section id="Work-And-Features" fade="all">
      {/* Features Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <H2 variants={fadeUpVariant} useParentAnimation>Features</H2>
        <Paragraph className="mb-10" variants={fadeUpVariant} useParentAnimation>
          We don't just build websites; we create digital experiences that
          captivate and convert. We deliver according to your needs, but here
          are some features our clients love:
        </Paragraph>

        <div className="flex flex-col gap-6">
          {/* Row container */}
          <div className="flex flex-wrap gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="w-full sm:flex-1 min-w-[280px]">
                  <motion.div
                    className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg h-full"
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
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
}
