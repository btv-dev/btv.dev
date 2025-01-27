"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import clsx from "clsx";

type FormStep = "service" | "budget" | "timeline" | "contact";
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

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
  const [status, setStatus] = useState<SubmissionStatus>("idle");
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
    try {
      setStatus("submitting");
      
      const formData = {
        ...data,
        access_key: "78432edd-0a4e-4101-a602-b3d909db5ec8",
        subject: `New Contact from ${data.firstName} ${data.lastName} - ${data.service}`,
        from_name: `${data.firstName} ${data.lastName}`,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
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

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center py-8">
          <div className="mb-4 text-btv-blue">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Thanks for reaching out!</h2>
          <p className="text-gray-600">
            We've received your message and will get back to you soon.
          </p>
        </div>
      </div>
    );
  }

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
                disabled={status === "submitting"}
                className={clsx(
                  "w-full text-white py-3 px-6 rounded-lg transition-colors",
                  status === "submitting" 
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-btv-blue hover:bg-btv-blue-600"
                )}
              >
                {status === "submitting" ? "Sending..." : "Submit"}
              </button>
              {status === "error" && (
                <p className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
