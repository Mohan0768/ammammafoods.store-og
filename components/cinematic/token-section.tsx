'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Governance',
    description: 'Vote on game updates and shape the future of the realm.',
  },
  {
    title: 'Rewards',
    description: 'Earn tokens by completing quests, battles, and achievements.',
  },
  {
    title: 'Trading',
    description: 'Buy, sell, and exchange legendary items with other players.',
  },
];

export function TokenSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featureRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 40%',
            scrub: 1,
          },
          duration: 0.8,
        }
      );

      // Feature cards animation
      featureRefs.current.forEach((feature, index) => {
        gsap.fromTo(
          feature,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              end: 'top 20%',
              scrub: 1,
            },
            stagger: 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 px-4 bg-gradient-to-b from-black via-pink-950/30 to-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
        >
          TOKEN & FEATURES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) featureRefs.current[index] = el;
              }}
              className="p-8 rounded-lg bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/20 hover:border-pink-400/60 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-pink-500/20"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Players Online', value: '50K+' },
            { label: 'Realms Explored', value: '1000+' },
            { label: 'Quests Completed', value: '500K+' },
            { label: 'Treasures Found', value: '1M+' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-purple-900/20 border border-purple-500/10"
            >
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
