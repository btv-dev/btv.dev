"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type FormStep = "service" | "budget" | "timeline" | "contact";

interface FormData {
  service: string;
  budget: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("service");
  const [formData, setFormData] = useState<FormData>({
    service: "",
    budget: "",
    timeline: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const services = [
    "A new website",
    "A mobile application",
    "Digital marketing",
    "Content creation",
    "Something else",
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Not sure yet",
  ];

  const timelineOptions = [
    "Immediately",
    "Next month",
    "Next quarter",
    "I'm flexible",
  ];

  const handleOptionSelect = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "service") setCurrentStep("budget");
    if (field === "budget") setCurrentStep("timeline");
    if (field === "timeline") setCurrentStep("contact");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log(formData);
  };

  const OptionButton = ({ value, field }: { value: string; field: keyof FormData }) => (
    <button
      onClick={() => handleOptionSelect(field, value)}
      className={clsx(
        "px-6 py-3 rounded-lg transition-all duration-200",
        "border border-gray-200 hover:border-gray-300",
        "text-left w-full",
        formData[field] === value && "border-blue-500 bg-blue-50"
      )}
    >
      {value}
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        <AnimatePresence mode="wait">
          {currentStep === "service" && (
            <motion.div
              key="service"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">What are you looking for?</h2>
              <div className="space-y-4">
                {services.map((service) => (
                  <OptionButton key={service} value={service} field="service" />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === "budget" && (
            <motion.div
              key="budget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">What's your budget?</h2>
              <div className="space-y-4">
                {budgetRanges.map((budget) => (
                  <OptionButton key={budget} value={budget} field="budget" />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">When do you want to start?</h2>
              <div className="space-y-4">
                {timelineOptions.map((timeline) => (
                  <OptionButton key={timeline} value={timeline} field="timeline" />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 h-32"
                  placeholder="Tell us more about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
