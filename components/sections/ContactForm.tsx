"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Lottie from "lottie-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FormStep = "service" | "budget" | "timeline" | "contact";
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

interface ColorScheme {
  border: string;
  bg: string;
}

const Spinner = () => (
  <motion.svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <motion.circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <motion.path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </motion.svg>
);

const CheckmarkAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/check-animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  if (!animationData) return null;

  return (
    <div className="w-32 h-32 mx-auto">
      <Lottie
        animationData={animationData}
        loop={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

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
    "A Full-Service Agency",
    "A New Website",
    "Digital Marketing",
    "A New Brand",
    "Something else",
  ];

  const budgetRanges = [
    "< $10,000",
    "$10,000 - $20,000",
    "$20,000 - $45,000",
    "> $45,000",
    "Not sure!",
  ];

  const timelineOptions = [
    "Immediately",
    "Next month",
    "Next quarter",
    "I'm flexible",
  ];

  const formSteps: FormStep[] = ["service", "budget", "timeline", "contact"];
  
  const currentStepIndex = formSteps.indexOf(currentStep);
  const hasPreviousStep = currentStepIndex > 0;
  
  // Watch the current values
  const currentService = watch("service");
  const currentBudget = watch("budget");
  const currentTimeline = watch("timeline");
  const currentFirstName = watch("firstName");
  const currentEmail = watch("email");

  // Check if current step has a valid selection
  const hasCurrentStepSelection = () => {
    switch (currentStep) {
      case "service":
        return !!currentService;
      case "budget":
        return !!currentBudget;
      case "timeline":
        return !!currentTimeline;
      case "contact":
        // Require at least first name and email for contact step
        return !!currentFirstName && !!currentEmail;
      default:
        return false;
    }
  };

  const hasNextStep = currentStepIndex < formSteps.length - 1 && currentStepIndex >= 0 && hasCurrentStepSelection();

  const handleOptionSelect = (field: keyof FormData, value: string) => {
    setValue(field, value);
    if (field === "service") setCurrentStep("budget");
    if (field === "budget") setCurrentStep("timeline");
    if (field === "timeline") setCurrentStep("contact");
  };

  const goToPreviousStep = () => {
    if (hasPreviousStep) {
      setCurrentStep(formSteps[currentStepIndex - 1]);
    }
  };

  const goToNextStep = () => {
    if (hasNextStep) {
      setCurrentStep(formSteps[currentStepIndex + 1]);
    }
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

  // Color combinations grouped by form section
  const colorSchemes = {
    service: [
      { border: "border-blue-400", bg: "bg-blue-50" },
      { border: "border-purple-400", bg: "bg-purple-50" },
      { border: "border-green-400", bg: "bg-green-50" },
      { border: "border-orange-400", bg: "bg-orange-50" },
      { border: "border-pink-400", bg: "bg-pink-50" },
    ],
    budget: [
      { border: "border-amber-400", bg: "bg-amber-50" },
      { border: "border-cyan-400", bg: "bg-cyan-50" },
      { border: "border-teal-400", bg: "bg-teal-50" },
      { border: "border-rose-400", bg: "bg-rose-50" },
      { border: "border-indigo-400", bg: "bg-indigo-50" },
    ],
    timeline: [
      { border: "border-emerald-400", bg: "bg-emerald-50" },
      { border: "border-violet-400", bg: "bg-violet-50" },
      { border: "border-fuchsia-400", bg: "bg-fuchsia-50" },
      { border: "border-sky-400", bg: "bg-sky-50" },
    ],
  };

  const getColorIndex = (value: string, options: string[]) => {
    const index = options.indexOf(value);
    return index >= 0 ? index : -1;
  };

  const getBorderColor = (value: string) => {
    let options: string[] = [];
    let colors: ColorScheme[] = [];
    
    if (currentStep === "service") {
      options = services;
      colors = colorSchemes.service;
    } else if (currentStep === "budget") {
      options = budgetRanges;
      colors = colorSchemes.budget;
    } else if (currentStep === "timeline") {
      options = timelineOptions;
      colors = colorSchemes.timeline;
    }

    const index = getColorIndex(value, options);
    return index >= 0 ? colors[index % colors.length].border : "border-gray-200";
  };

  const getBackgroundColor = (value: string) => {
    let options: string[] = [];
    let colors: ColorScheme[] = [];
    
    if (currentStep === "service") {
      options = services;
      colors = colorSchemes.service;
    } else if (currentStep === "budget") {
      options = budgetRanges;
      colors = colorSchemes.budget;
    } else if (currentStep === "timeline") {
      options = timelineOptions;
      colors = colorSchemes.timeline;
    }

    const index = getColorIndex(value, options);
    return index >= 0 ? colors[index % colors.length].bg : "bg-gray-50";
  };

  const OptionButton = ({ value, field }: { value: string; field: keyof FormData }) => (
    <button
      type="button"
      onClick={() => handleOptionSelect(field, value)}
      className={clsx(
        "px-6 py-3 rounded-lg transition-all duration-200",
        "border-2 hover:bg-opacity-50",
        getBorderColor(value),
        "text-center flex-1 min-w-[200px]",
        watchedFields[field] === value && [getBackgroundColor(value), "border-opacity-100"],
        watchedFields[field] !== value && ["hover:bg-opacity-10", "border-opacity-40", getBackgroundColor(value), "bg-opacity-0"]
      )}
    >
      {value}
    </button>
  );

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
      >
        <CheckmarkAnimation />
        <motion.div
          className="text-center pb-8 bt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Thanks for reaching out!
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            We've received your message and will get back to you soon.
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="relative mx-auto">
      {/* Form container with navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={goToPreviousStep}
          className={clsx(
            "p-2 rounded-full border bg-white shadow-sm hover:bg-gray-50 transition-opacity shrink-0",
            hasPreviousStep ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          disabled={!hasPreviousStep}
          aria-label="Previous step"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1">
          <div className="mx-auto">
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
                    <div className="flex flex-wrap gap-4">
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
                    <div className="flex flex-wrap gap-4">
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
                    <div className="flex flex-wrap gap-4">
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
                    className="space-y-6 bg-white p-8 rounded-lg shadow-md"
                  >
                    <h2 className="text-2xl font-bold mb-6">Tell us more about you!</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200"
                        placeholder="First Name"
                        {...register("firstName", { required: true })}
                      />
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200"
                        placeholder="Last Name"
                        {...register("lastName", { required: true })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200"
                        placeholder="Email"
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      />
                      <input
                        type="tel"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200"
                        placeholder="Phone"
                        {...register("phone")}
                      />
                    </div>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200"
                      placeholder="Company"
                      {...register("company")}
                    />
                    <textarea
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 h-32"
                      placeholder="Tell us more about your project..."
                      {...register("message")}
                    />
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className={clsx(
                        "w-full text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2",
                        status === "submitting"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-btv-blue hover:bg-btv-blue-600"
                      )}
                    >
                      {status === "submitting" ? (
                        <>
                          <Spinner />
                          <span>Submitting</span>
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm text-center"
                      >
                        Something went wrong. Please try again or email us directly.
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        <button
          onClick={goToNextStep}
          className={clsx(
            "p-2 rounded-full border bg-white shadow-sm hover:bg-gray-50 transition-opacity shrink-0",
            hasNextStep ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          disabled={!hasNextStep}
          aria-label="Next step"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
