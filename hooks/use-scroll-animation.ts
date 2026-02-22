import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationConfig {
  start?: string;
  end?: string;
  scrub?: number | boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export function useScrollAnimation(config: ScrollAnimationConfig = {}) {
  const elementRef = useRef<HTMLElement | null>(null);

  const defaults = {
    start: 'top center',
    end: 'center center',
    scrub: 1,
    ...config,
  };

  useEffect(() => {
    if (!elementRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: defaults.start,
      end: defaults.end,
      onEnter: defaults.onEnter,
      onLeave: defaults.onLeave,
    });

    return () => {
      trigger.kill();
    };
  }, [defaults]);

  return elementRef;
}

export function useParallax(speed: number = 1) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: () => window.innerHeight * speed,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
}

export function useTextReveal() {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          },
          duration: 0.8,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return elementRef;
}
