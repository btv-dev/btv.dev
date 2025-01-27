import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { H3 } from './typography';

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
  const [shouldAutoSlide, setShouldAutoSlide] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAutoSlide(true);
            setIsAnimating(true);
          } else {
            setShouldAutoSlide(false);
            setIsAnimating(false);
          }
        });
      },
      {
        threshold: 0
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldAutoSlide) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Create new timer
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [shouldAutoSlide, currentIndex]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
    // Reset animation
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 50);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="flex flex-col sm:flex-row sm:space-x-8">
        <div className="relative w-full sm:w-3/5" ref={containerRef}>
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
                className={`h-4 rounded-full transition-all duration-300 relative ${
                  index === currentIndex 
                    ? 'w-12 bg-btv-blue-500 overflow-hidden' 
                    : 'w-4 bg-btv-blue-300 hover:bg-btv-blue-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && isAnimating && (
                  <div 
                    className="absolute inset-0 bg-btv-blue-300 origin-left"
                    style={{
                      animation: 'progress 5s cubic-bezier(0.3, 0.1, 0.4, 1) infinite',
                      animationPlayState: shouldAutoSlide ? 'running' : 'paused'
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <style jsx>{`
            @keyframes progress {
              0% {
                transform: scaleX(0);
              }
              100% {
                transform: scaleX(1);
              }
            }
          `}</style>
        </div>

        <div className="mt-6 sm:mt-0 sm:w-2/5">
          <div className="space-y-4">
            <H3 className="font-rubik-mono-one text-2xl sm:text-xl md:text-3xl font-bold tracking-tight text-gray-900">
              {slides[currentIndex].title}
            </H3>
            <p className="text-gray-600">
              {slides[currentIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}