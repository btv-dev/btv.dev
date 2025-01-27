import Image from 'next/image';
import { useState, useEffect } from 'react';
import { H2 } from './typography';

interface Slide {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    title: "1: Discover",
    alt: "Step 1",
    description: "We start by diving deep into your goals, brand personality, and design preferences.",
    src: "/images/approach/research.webp",
  },
  {
    title: "2: Brainstorm",
    alt: "Step 2",
    description: "We sketch ideas on paper and create mockups, visualizing potential directions and refining concepts before moving forward.",
    src: "/images/approach/sketch.webp",
  },
  {
    title: "3: Build",
    alt: "Step 3",
    description: "Bringing designs to life, we begin development to craft a site that exceeds expectations.",
    src: "/images/approach/build.webp",
  },
];

export default function ImageStepper() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
        <div className="relative w-full lg:w-3/5">
          <div className="relative h-96 sm:h-80 md:h-96 overflow-hidden rounded-xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-gray-900' : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 lg:mt-0 lg:w-2/5">
          <div className="space-y-4">
            <H2 className="text-xl font-bold tracking-tight text-gray-900">
              {slides[currentIndex].title}
            </H2>
            <p className="text-gray-600">
              {slides[currentIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}