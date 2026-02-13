'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Home Chef',
    content: 'Ammamma Foods masalas have transformed my cooking! The quality and freshness are unmatched. My family loves every dish.',
    rating: 5,
    image: '/products/garam-masala.jpg',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    role: 'Restaurant Owner',
    content: 'We switched to Ammamma Foods for all our spice needs. The consistency and authentic flavors have impressed our customers.',
    rating: 5,
    image: '/products/curry-powder.jpg',
  },
  {
    id: 3,
    name: 'Meera Patel',
    role: 'Food Blogger',
    content: 'As someone who values authenticity, Ammamma Foods is my go-to brand. The masalas deliver incredible depth of flavor.',
    rating: 5,
    image: '/products/tandoori-masala.jpg',
  },
  {
    id: 4,
    name: 'Arjun Singh',
    role: 'Cooking Instructor',
    content: 'My students always ask about the masalas we use. I recommend Ammamma Foods because they represent true quality and tradition.',
    rating: 5,
    image: '/products/biryani-masala.jpg',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
            What They&apos;re <span className="text-primary">Talking?</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden">
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === currentIndex;
              const offset = (idx - currentIndex + testimonials.length) % testimonials.length;

              return (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100 md:col-span-2 md:row-span-2' : 'opacity-50 scale-90'
                  }`}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col p-6 border border-gray-100">
                    {/* Profile Image */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 flex-shrink-0 overflow-hidden">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <p className="text-foreground leading-relaxed mb-4 flex-grow">
                      {testimonial.content}
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                      ))}
                    </div>

                    {/* Author */}
                    <div>
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
