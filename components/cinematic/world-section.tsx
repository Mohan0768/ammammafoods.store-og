'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  { depth: 1, text: 'Mountains', offset: 0 },
  { depth: 2, text: 'Forests', offset: 20 },
  { depth: 3, text: 'Kingdoms', offset: 40 },
  { depth: 4, text: 'Dungeons', offset: 60 },
];

export function WorldSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      layerRefs.current.forEach((layer, index) => {
        gsap.fromTo(
          layer,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${60 - index * 15}%`,
              end: `top ${40 - index * 15}%`,
              scrub: 1,
            },
            duration: 0.5,
          }
        );

        // Parallax effect
        gsap.to(layer, {
          y: index * 20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-4 bg-gradient-to-b from-black via-purple-950/30 to-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          ABOUT THE WORLD
        </h2>

        <div className="space-y-12">
          {layers.map((layer, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) layerRefs.current[index] = el;
              }}
              className="opacity-0"
            >
              <div className="flex items-center gap-6 md:gap-12">
                <div className="hidden md:block w-1 h-20 bg-gradient-to-b from-purple-400 to-transparent" />
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    {layer.text}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                    {layer.text === 'Mountains' &&
                      'Towering peaks pierce the crimson sky, where ancient spirits guard forgotten secrets.'}
                    {layer.text === 'Forests' &&
                      'Dense woodlands shrouded in eternal twilight, home to creatures both wondrous and terrible.'}
                    {layer.text === 'Kingdoms' &&
                      'Sprawling civilizations built on power, magic, and the ambitions of mortals.'}
                    {layer.text === 'Dungeons' &&
                      'Deep underground labyrinths where treasures and horrors await the brave.'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
