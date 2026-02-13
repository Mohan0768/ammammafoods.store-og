'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { PantryBoxesSection } from '@/components/pantry-boxes-section';
import { CompanyStorySlideshow } from '@/components/company-story-slideshow';
import { AboutSection } from '@/components/about-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FAQSection } from '@/components/faq-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { useCart } from '@/hooks/use-cart';

export default function Page() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        cartItems={items}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
      <main className="flex-1 pb-16 md:pb-0">
        <Hero />
        <PantryBoxesSection />
        <CompanyStorySlideshow />
        <AboutSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileBottomNav
        cartItems={items}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
