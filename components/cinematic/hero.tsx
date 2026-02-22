'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleBackground from './particle-background';

gsap.registerPlugin(ScrollTrigger);

export function CinematicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Title fade-up animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power4.out',
        }
      );

      // Subtitle fade-up with delay
      gsap.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 50,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: 0.3,
          ease: 'power4.out',
        }
      );

      // CTA button entrance with glow
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'back.out(1.7)',
        }
      );

      // Parallax effect on scroll
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        opacity: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <ParticleBackground />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600"
        >
          ENTER THE REALM
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-gray-300 mb-12 font-light leading-relaxed"
        >
          Experience a cinematic journey through darkness and mystery. Where legends are born.
        </p>

        <button
          ref={ctaRef}
          className="group relative px-10 py-4 md:px-14 md:py-5 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50"
        >
          <span className="relative z-10">Discover More</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-purple-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
