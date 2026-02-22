'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTAFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Content fade-in
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
          duration: 0.8,
        }
      );

      // Button hover glow
      if (buttonRef.current) {
        buttonRef.current.addEventListener('mouseenter', () => {
          gsap.to(buttonRef.current, {
            boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)',
            scale: 1.05,
            duration: 0.3,
          });
        });

        buttonRef.current.addEventListener('mouseleave', () => {
          gsap.to(buttonRef.current, {
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
            scale: 1,
            duration: 0.3,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 px-4 bg-black overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-pink-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400">
          READY FOR ADVENTURE?
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light leading-relaxed">
          Begin your epic journey today and become a legend in the realm.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            ref={buttonRef}
            className="px-10 py-4 md:px-16 md:py-6 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:shadow-pink-500/50 shadow-lg transition-all duration-300 cursor-pointer"
            style={{
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
            }}
          >
            START PLAYING NOW
          </button>

          <button className="px-10 py-4 md:px-16 md:py-6 text-lg md:text-xl font-bold text-white border-2 border-purple-500 rounded-lg hover:bg-purple-500/10 transition-all duration-300">
            LEARN MORE
          </button>
        </div>

        {/* Footer links */}
        <div className="mt-20 pt-12 border-t border-purple-500/20">
          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm md:text-base">
            <a href="#" className="hover:text-purple-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Discord
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Twitter
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            © 2024 The Realm. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
