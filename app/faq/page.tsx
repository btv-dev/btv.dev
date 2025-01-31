'use client';
import { H1, Paragraph } from "@/components/ui/typography";
import Image from "next/image";
import squareLogo from "../../public/images/square-logo.png";
import { FaqSection } from "@/components/ui/faq";
import ContactForm from "@/components/sections/ContactForm";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {


  const [showContactForm, setShowContactForm] = useState(false);


  type FAQ = {
    question: string;
    answer: string;
  }[];
  
  const faqs: FAQ = [
    {
      question: "Who will I work with?",
      answer: "As a boutique studio, you'll work directly with our core team throughout your project. You'll collaborate with the same designers and developers who understand your vision from the start. No handoffs to contractors or junior staff - just consistent, quality-focused partnership from beginning to end."
    },
    {
      question: "Do I fully own the website you are building?",
      answer: "100%. Everything we create for you - from brand assets to website code - is all yours. While most clients choose to maintain an ongoing relationship with us for evolution and optimization, you'll always have full ownership and control of your digital identity. If you ever decide to work with another team, we'll ensure a smooth transition."
    },
    {
      question: "What's the typical investment for working together?",
      answer: "Digital identity projects typically begin at $10,000 for focused brand work and range up to $40,000+ for comprehensive digital presence development. We structure payments as 50% upfront with the remainder spread across the project timeline. We're transparent about costs because we believe it helps ensure we're the right fit for each other."
    },
    {
      question: "How does the payment process work?",
      answer: "The project starts with a 50% deposit and 4 monthly installments of the project balance over the course of development."
    },
    {
      question: "How long does a typical project take?",
      answer: "Most comprehensive digital identity projects take 8-12 weeks from discovery to launch. Brand identity work typically runs 4-6 weeks, while full digital presence development including website, animation, and content strategy can extend to 12-16 weeks. We'll provide a detailed timeline based on your specific needs during our initial conversations."
    },
    {
      question: "What types of organizations do you work with?",
      answer: "We work with organizations that take pride in doing things differently – from craft producers and artisanal makers to innovative non-profits and purpose-driven professionals. Our clients share a commitment to quality and intention in their work, regardless of their industry. While we're proud of our Vermont roots, we also work with quality-focused organizations around the globe."
    },
    {
      question: "Do you help with content creation and messaging?",
      answer: "Yes, we can help develop both the visual and verbal aspects of your brand. We can help you design and develop content, write copy, create engaging animations, and ensure your digital presence communicates consistently across all channels. We believe great design and great content work hand in hand."
    },
    {
      question: "Can you help with just one aspect of our digital presence?",
      answer: "Absolutely. While we excel at comprehensive digital identity projects, we also take on focused engagements in brand design, animation, or web development. The key is ensuring that whatever we create aligns with and enhances your overall digital presence. We're happy to discuss how we can best support your specific needs."
    },
    {
      question: "Do you offer special considerations for non-profits?",
      answer: "Yes, we have a deep commitment to supporting mission-driven organizations. We offer adjusted pricing for registered non-profits and can help structure projects to align with grant funding and budgeting cycles. We understand the unique challenges non-profits face and tailor our approach accordingly."
    },
    {
      question: "What happens after launch?",
      answer: "Your digital presence is a living thing that should evolve with your organization. After launch, we'll schedule a review session to gather insights and plan next steps. Many clients choose to continue working with us through retainer relationships that include regular updates, optimization, and strategic planning. We're here to support your long-term success."
    },
    {
      question: "How do we get started?",
      answer: "It begins with a conversation. Reach out through our contact form or email us at hey@btv.dev. We'll schedule a call to learn about your needs, share our approach, and determine if we're a good fit for each other. From there, we'll craft a proposal that outlines our recommended approach, timeline, and investment."
    }
  ];

  return (
    <>
      <nav className="w-full shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <Image
              src={squareLogo}
              alt="BTV Logo"
              priority
              placeholder="blur"
              className="size-20"
            />
            <a
              href="/"
              className="px-4 py-2 font-rubik-mono-one text-btv-blue-500 hover:text-btv-blue-600 transition-colors font-medium text-xl"
            >
              Home
            </a>
          </div>
        </div>
      </nav>
      <main className="h-full max-w-4xl mx-auto leading-loose flex justify-center flex-col items-center mb-24">
        <H1 className="text-center mt-16 mb-0">
          Frequently Asked Questions
        </H1>
        <FaqSection
          items={faqs}
        />

        <AnimatePresence mode="wait">
          {!showContactForm ? (
            <motion.div
              key="contact-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-md mx-auto mt-12 p-6 rounded-lg text-center flex flex-col justify-center gap-4"
            >
              <Paragraph className="text-xl font-medium text-foreground mb-1">
                Still have questions?
              </Paragraph>
              <Button className="bg-btv-blue-500 hover:bg-btv-blue-600 text-xl px-3 py-6 flex gap-2 w-fit mx-auto" onClick={() => setShowContactForm(true)}>
                <MessageCircleIcon className="size-6" /> Get in touch!
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="contact-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
