'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sprout } from 'lucide-react';
import Link from 'next/link';
import { pantryBoxes, products } from '@/lib/products';
import GlareHover from '@/components/glare-hover';

const categories = [
  { label: 'Bachelor Box', image: '/products/garam-masala.svg', href: '/custom-box?box=combo-1' },
  { label: 'Family Box', image: '/products/biryani-masala.svg', href: '/custom-box?box=combo-2' },
  { label: 'NRI Box', image: '/products/sambar-powder.svg', href: '/custom-box?box=combo-3' },
  { label: 'Custom Box', image: '/products/curry-powder.svg', href: '/custom-box' },
  { label: 'All Spices', image: '/products/chaat-masala.svg', href: '/#pantry-boxes' },
  { label: 'Our Story', image: '/products/rasam-powder.svg', href: '/#story' },
];

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const pageWidth = el.clientWidth;
      setCurrentPage(Math.round(scrollLeft / pageWidth));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ===================== MOBILE HERO: Category Circles ===================== */}
      <section className="lg:hidden bg-card py-6">
        <div
          ref={scrollRef}
          className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="flex flex-col items-center gap-2 flex-shrink-0 snap-start"
              style={{ minWidth: '72px' }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 bg-muted flex items-center justify-center shadow-sm">
                <img
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.label}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-[10px] font-medium text-foreground text-center leading-tight max-w-[72px]">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentPage ? 'bg-foreground w-4' : 'bg-foreground/30'
              }`}
              aria-label={`Go to page ${idx + 1}`}
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left: idx * (scrollRef.current?.clientWidth || 0),
                  behavior: 'smooth',
                });
              }}
            />
          ))}
        </div>
      </section>

      {/* ===================== DESKTOP HERO ===================== */}
      <div className="relative w-full overflow-hidden hidden lg:block">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'url(/products/garam-masala.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />

        {/* Animated Background Elements */}
        <div className="absolute top-20 right-20 w-48 h-48 bg-secondary rounded-full opacity-5 blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary rounded-full opacity-5 blur-3xl animate-pulse-soft" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-start px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="w-full max-w-3xl space-y-6 md:space-y-8">
            {/* Subheading with Line */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="h-1 w-16 bg-secondary rounded-full" />
              <span className="text-secondary font-bold tracking-widest text-sm uppercase">Curated Pantry Boxes</span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight text-white transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ letterSpacing: '0.02em' }}
            >
              Your Perfect
              <br />
              <span className="font-bold">Pantry Box</span>
            </h1>

            {/* Description */}
            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Handcrafted Indian masala boxes curated for every lifestyle. Pick your favorites, customize your box with at least 4 products, and pay only for what you select.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Link
                href="#pantry-boxes"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 active:scale-95 flex-shrink-0"
              >
                Explore Pantry Boxes
                <ArrowRight className="w-4 sm:w-6 h-4 sm:h-6" />
              </Link>
              <Link
                href="#story"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg border border-white/30 transition-all duration-300 backdrop-blur-sm active:scale-95 flex-shrink-0"
              >
                <Sprout className="w-4 sm:w-6 h-4 sm:h-6" />
                Our Story
              </Link>
              <Link
                href="/cinematic"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 active:scale-95 flex-shrink-0"
              >
                Experience Cinematic
                <ArrowRight className="w-4 sm:w-6 h-4 sm:h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="animate-float">
            <div className="h-12 w-7 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
              <div className="h-2 w-1 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Product Carousel at Bottom - Shows pantry box items */}
        <div className="relative w-full bg-card pt-8 md:pt-12 pb-6 md:pb-8 shadow-2xl mt-0 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Our Spice Collection</h3>
            </div>

            {/* Auto Scrolling Track */}
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-scroll hover:pause-animation">
                {[...products, ...products].map((product, idx) => (
                  <Link
                    key={`${product.id}-${idx}`}
                    href="/custom-box"
                    className="relative group flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] bg-gray-900 rounded-2xl p-4 overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_25px_gold]"
                    style={{
                      boxShadow: '0 0 15px rgba(255,255,255,0.1)'
                    }}
                  >
                    {/* Glitter Effect */}
                    <div className="absolute inset-0 pointer-events-none animate-glitter" style={{
                      background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4), transparent 70%)',
                      transform: 'translateX(-100%)'
                    }} />
                    
                    <div className="relative z-10">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-[140px] sm:h-[160px] object-cover rounded-xl mb-3"
                      />
                      <h3 className="text-sm font-bold text-white mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-400 mb-2">{product.description.slice(0, 30)}...</p>
                      <p className="text-sm font-bold text-primary">{'Rs.'}{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @keyframes glitter {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(100%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }

          .animate-glitter {
            animation: glitter 3s infinite;
          }
        `}</style>
      </div>
    </>
  );
}
