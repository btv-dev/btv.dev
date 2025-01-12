"use client";

import { Section } from "../ui/layout";
import { MotionH2, MotionParagraph } from "../ui/motion-typography";

const steps = [
  {
    name: "1 – Discover",
    quote:
      "We start by diving deep into your goals, brand personality, and design preferences.",
    src: "/images/approach/research.jpg",
  },
  {
    name: "2 – Sketch & Brainstorm",
    quote:
      "We sketch ideas on paper and create mockups, visualizing potential directions and refining concepts before moving forward.",
    src: "/images/approach/sketch.jpg",
  },
  {
    name: "3 – Build",
    quote:
      "Bringing designs to life, we begin development to craft a site that exceeds expectations.",
    src: "/images/approach/build.jpg",
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const OurApproach = () => {
  return (
    <Section id="Our-Approach" className="my-8 sm:my-16 px-4">
      <MotionH2>Our Approach</MotionH2>

      <MotionParagraph>
        At BTV.dev, our collaborative process ensures your vision comes to
        life—beautifully and seamlessly.
      </MotionParagraph>

      <div className="flex flex-wrap justify-center gap-6">
        <AnimatedTestimonials testimonials={steps} />
      </div>

      <MotionParagraph
        className="text-center mt-8 mx-auto max-w-2xl"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Through sketches and mockups, we explore various possibilities and steer
        the project in the right direction before committing to the final
        design, ensuring our work aligns perfectly with your vision.
      </MotionParagraph>
    </Section>
  );
};

export default OurApproach;

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}

export { AnimatedTestimonialsDemo };
