'use client';

import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && imageRef.current && contentRef.current) {
      // Image moves slower (parallax effect)
      gsap.to(imageRef.current, {
        yPercent: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Content moves in opposite direction for depth
      gsap.to(contentRef.current, {
        yPercent: -15,
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

  return (
    <section ref={sectionRef} id="about" className="py-20 sm:py-32 bg-white overflow-hidden perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">About Company</p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 animate-layer-3d-in" style={{ transform: 'translateZ(20px)' }}>
            Agriculture & Farming <span className="text-primary">Organic Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side - 3D Card Effect */}
          <div ref={imageRef} className="relative group animate-slideInLeft animate-card-tilt" style={{ willChange: 'transform' }}>
            <div className="relative rounded-2xl overflow-hidden h-96 lg:h-full shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300" style={{ transform: 'translateZ(30px)' }}>
              <img
                src="/products/garam-masala.jpg"
                alt="Ammamma Foods Farm"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Experience Badge - 3D Float */}
              <div className="absolute bottom-6 right-6 bg-primary text-white rounded-full px-6 py-4 font-bold text-center shadow-2xl animate-float-3d" style={{ transform: 'translateZ(50px)' }}>
                <p className="text-2xl">15+</p>
                <p className="text-sm font-semibold">years of experience</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="space-y-8 animate-slideInRight" style={{ willChange: 'transform' }}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ammamma Foods began with a passion for authentic Indian cuisine and a commitment to preserving traditional spice blending methods. Every blend is crafted with care, using time-tested recipes passed down through generations.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in quality over quantity. Our spices are sourced directly from the finest farms across India, roasted fresh in small batches, and packaged to maintain maximum aroma and flavor.
            </p>

            {/* Features List - 3D Layered */}
            <div className="space-y-3">
              {[
                'Sourced from finest farms across India',
                'No artificial preservatives or additives',
                'Small-batch roasting for peak freshness',
                'Hermetically sealed for maximum freshness',
                'Available for worldwide shipping',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group animate-fadeInUp hover:translate-x-2 transition-transform"
                  style={{ animationDelay: `${index * 0.1}s`, transform: `translateZ(${10 + index * 5}px)` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats - 3D Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '25+', label: 'Masala Varieties' },
                { value: '10+', label: 'Years Legacy' },
                { value: '95%', label: 'Repeat Customers' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20 hover:border-primary/50 transition-all duration-300 animate-fadeInUp hover:shadow-xl hover:scale-105"
                  style={{
                    animationDelay: `${(idx + 5) * 0.1}s`,
                    transform: `translateZ(${20 + idx * 5}px)`,
                  }}
                >
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
