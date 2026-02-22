'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const gameplayCards = [
  {
    title: 'Combat',
    description: 'Master dynamic real-time battles with precision and strategy.',
    icon: '⚔️',
  },
  {
    title: 'Exploration',
    description: 'Uncover hidden realms filled with secrets and breathtaking vistas.',
    icon: '🗺️',
  },
  {
    title: 'Magic',
    description: 'Harness ancient spells and create devastating magical combos.',
    icon: '✨',
  },
  {
    title: 'Loot',
    description: 'Collect legendary artifacts and legendary equipment throughout your journey.',
    icon: '💎',
  },
];

export function GameplaySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      if (cards.length === 0) return;

      // Horizontal scroll animation
      gsap.to(containerRef.current, {
        x: () => {
          const scrollWidth =
            containerRef.current!.scrollWidth - window.innerWidth;
          return -scrollWidth;
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: `+=${window.innerWidth * 2}`,
          scrub: 1,
          markers: false,
        },
      });

      // Cards entrance animation
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top 40%',
              scrub: 1,
            },
            stagger: 0.1,
            delay: index * 0.1,
          }
        );

        // Hover glow effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
            scale: 1.05,
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            boxShadow: '0 0 0px rgba(168, 85, 247, 0)',
            scale: 1,
            duration: 0.3,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-32 bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
          GAMEPLAY FEATURES
        </h2>
        <p className="text-gray-300 text-center text-lg max-w-2xl mx-auto">
          Experience a world of endless possibilities and epic adventures
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 px-4 md:px-8 pb-8"
          style={{ willChange: 'transform' }}
        >
          {gameplayCards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="flex-shrink-0 w-80 md:w-96 p-8 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/30 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="text-5xl mb-6">{card.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {card.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
