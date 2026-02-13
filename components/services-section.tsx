'use client';

import { Leaf, Zap, Shield, Globe } from 'lucide-react';
import GlareHover from '@/components/glare-hover';

const services = [
  {
    id: 1,
    icon: Leaf,
    title: 'Organic & Natural',
    mobileTitle: 'Handpicked Ingredients',
    description: 'Made with 100% natural ingredients sourced from trusted farms. No artificial additives or preservatives.',
    image: '/products/chaat-masala.jpg',
  },
  {
    id: 2,
    icon: Shield,
    title: 'Quality Assured',
    mobileTitle: 'Point Quality Check',
    description: 'Every batch is carefully tested for quality and authenticity. We maintain the highest standards.',
    image: '/products/rasam-powder.jpg',
  },
  {
    id: 3,
    icon: Zap,
    title: 'Fresh Quality',
    mobileTitle: 'Sundried Spices',
    description: 'Freshly ground masalas prepared in small batches to ensure maximum flavor and aroma in every pinch.',
    image: '/products/sambar-powder.jpg',
  },
  {
    id: 4,
    icon: Globe,
    title: 'Worldwide Delivery',
    mobileTitle: 'COD Available',
    description: 'We ship to customers all over the world with secure packaging to keep your masalas fresh.',
    image: '/products/panch-phoron.jpg',
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden">
      {/* ===================== MOBILE: 2x2 Features Grid ===================== */}
      <div className="lg:hidden py-8 bg-white">
        <div className="grid grid-cols-2 gap-6 px-6 max-w-sm mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="flex flex-col items-center gap-2 text-center">
                <div className="w-14 h-14 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#1a5e2a]" />
                </div>
                <span className="text-xs font-semibold text-foreground leading-tight">
                  {service.mobileTitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================== DESKTOP: Full Service Cards ===================== */}
      <div className="hidden lg:block py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full opacity-5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fadeInUp">
            <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">We Provide</p>
            <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
              Best Spice Services <span className="text-primary">In The World</span>
            </h2>
          </div>

          {/* Services Grid with Circular Photo Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="animate-fadeInUp group relative"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  {/* Circular Photo Effect Background */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />

                  <div className="relative rounded-2xl overflow-hidden h-96 shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Background Image with Glare Effect */}
                    <GlareHover
                      width="100%"
                      height="100%"
                      background="transparent"
                      borderRadius="0"
                      borderColor="transparent"
                      glareColor="#ffffff"
                      glareOpacity={0.2}
                      glareAngle={-45}
                      glareSize={400}
                      transitionDuration={700}
                      playOnce={false}
                      style={{ height: '384px' }}
                    >
                      <div className="absolute inset-0 overflow-hidden w-full h-full">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </GlareHover>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                    {/* Circular Photo Accent Circles */}
                    <div className="absolute top-4 right-4 w-20 h-20 border-2 border-secondary rounded-full opacity-60 group-hover:scale-125 transition-transform duration-300" />
                    <div className="absolute bottom-8 left-4 w-32 h-32 border border-primary/30 rounded-full opacity-40 group-hover:scale-110 transition-transform duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Icon */}
                      <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-foreground" />
                      </div>

                      {/* Text */}
                      <div>
                        <h3 className="text-white font-bold text-2xl mb-2">{service.title}</h3>
                        <p className="text-gray-200 leading-relaxed text-sm">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
