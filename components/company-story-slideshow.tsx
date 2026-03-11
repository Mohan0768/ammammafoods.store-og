'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storySlides = [
  {
    id: 1,
    title: 'Where It All Began',
    subtitle: 'Chapter 1',
    description: 'In a small kitchen in South India, a grandmother\'s love for authentic spices sparked a journey that would touch thousands of lives.',
    gradient: 'from-amber-900 via-amber-800 to-yellow-900',
  },
  {
    id: 2,
    title: "Grandmother's Recipe",
    subtitle: 'Chapter 2',
    description: 'Every blend carries the wisdom of generations - hand-ground spices, sun-dried herbs, and the secret touch that only Ammamma knew.',
    gradient: 'from-orange-900 via-red-900 to-amber-900',
  },
  {
    id: 3,
    title: 'First Kitchen',
    subtitle: 'Chapter 3',
    description: 'From a humble home kitchen to our first dedicated workspace, we never compromised on quality or tradition.',
    gradient: 'from-yellow-900 via-amber-800 to-orange-900',
  },
  {
    id: 4,
    title: 'Growing the Family',
    subtitle: 'Chapter 4',
    description: 'Our team grew from a family of 3 to a community of passionate spice artisans who share the same vision.',
    gradient: 'from-red-900 via-orange-900 to-amber-800',
  },
  {
    id: 5,
    title: 'Market Days',
    subtitle: 'Chapter 5',
    description: 'The local markets became our stage. Customers tasted, loved, and returned for more - word spread like wildfire.',
    gradient: 'from-amber-800 via-yellow-900 to-orange-800',
  },
  {
    id: 6,
    title: 'Customer Love',
    subtitle: 'Chapter 6',
    description: 'Every smile, every repeat order, every "this tastes like home" fueled our passion to reach more families.',
    gradient: 'from-orange-800 via-amber-900 to-red-900',
  },
  {
    id: 7,
    title: 'Expanding Horizons',
    subtitle: 'Chapter 7',
    description: 'From local markets to nationwide delivery - Ammamma\'s flavors now reach kitchens across India and beyond.',
    gradient: 'from-yellow-800 via-orange-900 to-amber-900',
  },
  {
    id: 8,
    title: 'Quality First',
    subtitle: 'Chapter 8',
    description: 'We source the finest ingredients directly from farmers, ensuring every packet delivers the purest flavors.',
    gradient: 'from-amber-900 via-red-800 to-orange-900',
  },
  {
    id: 9,
    title: 'Our Team Today',
    subtitle: 'Chapter 9',
    description: 'A dedicated team of spice experts, quality testers, and packaging artists work together to bring Ammamma\'s magic to your door.',
    gradient: 'from-red-800 via-amber-800 to-yellow-900',
  },
  {
    id: 10,
    title: 'The Future',
    subtitle: 'Chapter 10',
    description: 'Our journey continues - bringing traditional Indian flavors to every home worldwide, one pantry box at a time.',
    gradient: 'from-orange-900 via-yellow-800 to-amber-800',
  },
];

export function CompanyStorySlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect on section scroll
    if (sectionRef.current && contentRef.current && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      });

      // Subtle content shift for depth
      gsap.to(contentRef.current, {
        yPercent: -5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 400);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % storySlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + storySlides.length) % storySlides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const slide = storySlides[currentSlide];

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Container */}
      <div className="relative h-[500px] sm:h-[550px] lg:h-[600px]">
        {/* Background with Ken Burns */}
        <div
          key={`bg-${currentSlide}`}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} animate-kenBurns`}
          style={{ willChange: 'opacity' }}
        />

        {/* Placeholder image overlay pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
                           radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)`
        }} />

        {/* Dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/40"
          style={{ willChange: 'opacity', opacity: 0.4 }}
        />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 sm:px-12 lg:px-20 text-center"
          style={{ willChange: 'transform' }}
        >
          {/* Chapter indicator */}
          <div
            key={`sub-${currentSlide}`}
            className={isTransitioning ? 'animate-slideFadeOut' : 'animate-slideFadeIn'}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm font-semibold tracking-wider uppercase mb-4 border border-white/20">
              {slide.subtitle}
            </span>
          </div>

          {/* Title */}
          <h2
            key={`title-${currentSlide}`}
            className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight ${
              isTransitioning ? 'animate-slideFadeOut' : 'animate-slideFadeIn'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            {slide.title}
          </h2>

          {/* Description */}
          <p
            key={`desc-${currentSlide}`}
            className={`text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed ${
              isTransitioning ? 'animate-slideFadeOut' : 'animate-slideFadeIn'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {slide.description}
          </p>

          {/* Slide counter */}
          <div
            className={`mt-8 text-white/60 text-sm font-medium ${
              isTransitioning ? 'animate-slideFadeOut' : 'animate-slideFadeIn'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            {String(currentSlide + 1).padStart(2, '0')} / {String(storySlides.length).padStart(2, '0')}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 sm:px-12 pb-6">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {storySlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="group relative"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? 'w-10 bg-white'
                    : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              >
                {/* Active progress fill */}
                {idx === currentSlide && !isPaused && (
                  <div
                    ref={progressRef}
                    key={`progress-${currentSlide}`}
                    className="h-full rounded-full bg-secondary animate-progressBar"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
