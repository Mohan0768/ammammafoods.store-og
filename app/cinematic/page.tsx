'use client';

import { useEffect, useRef } from 'react';
import { Lenis } from 'lenis';
import { CinematicHero } from '@/components/cinematic/hero';
import { WorldSection } from '@/components/cinematic/world-section';
import { GameplaySection } from '@/components/cinematic/gameplay-section';
import { TokenSection } from '@/components/cinematic/token-section';
import { CTAFooter } from '@/components/cinematic/cta-footer';

export default function CinematicPage() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <CinematicHero />
      <WorldSection />
      <GameplaySection />
      <TokenSection />
      <CTAFooter />
    </div>
  );
}
