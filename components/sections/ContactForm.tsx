"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();

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
    setValue(field, value);
    if (field === "service") setCurrentStep("budget");
    if (field === "budget") setCurrentStep("timeline");
    if (field === "timeline") setCurrentStep("contact");
  };

  const onSubmit = async (data: FormData) => {
    // TODO: Implement form submission logic
    console.log(data);
  };

  const watchedFields = watch();

  const OptionButton = ({ value, field }: { value: string; field: keyof FormData }) => (
    <button
      type="button"
      onClick={() => handleOptionSelect(field, value)}
      className={clsx(
        "px-6 py-3 rounded-lg transition-all duration-200",
        "border border-gray-200 hover:border-gray-300",
        "text-left w-full",
        watchedFields[field] === value && "border-blue-500 bg-blue-50"
      )}
    >
      {value}
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
              <h2 className="text-2xl font-bold mb-6">Tell us more about you!</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                    {...register("firstName", { required: true })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                    {...register("phone")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200"
                  {...register("company")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Additional Information</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 h-32"
                  placeholder="Tell us more about your project..."
                  {...register("message")}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-btv-blue text-white py-3 px-6 rounded-lg hover:bg-btv-blue-600 transition-colors"
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
