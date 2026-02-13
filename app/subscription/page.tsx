'use client';

import { Header } from '@/components/header';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { pantryBoxes, subscriptionPlans } from '@/lib/products';

export default function SubscriptionPage() {
  const router = useRouter();
  const { items, addToCart, removeFromCart, updateQuantity } = useCart();

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

      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fadeInUp">
            <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Subscription Plans</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
              Never Run Out of Your Favorite Masalas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Subscribe to regular deliveries and save up to 20% on your monthly orders
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {subscriptionPlans.map((plan, idx) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden animate-fadeInUp ${
                  idx === 1 ? 'border-2 border-secondary md:scale-105' : 'border border-border'
                }`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {idx === 1 && (
                  <div className="absolute top-0 right-0 bg-secondary text-foreground px-4 py-1 text-sm font-bold rounded-bl-lg">
                    BEST VALUE
                  </div>
                )}

                <div className="p-8 bg-white">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                    SAVE {plan.discount}%
                  </p>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{plan.label}</h3>
                  <p className="text-muted-foreground mb-6">Auto-deliver every month</p>

                  {/* Features */}
                  <div className="space-y-3 mb-8 p-4 bg-primary/5 rounded-lg">
                    {[
                      'Regular monthly delivery',
                      `${plan.discount}% discount on all orders`,
                      'Free shipping',
                      'Flexible subscription management',
                      'Cancel anytime',
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/checkout?subscription=true"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                      idx === 1
                        ? 'bg-secondary hover:bg-secondary/90 text-foreground hover:scale-105'
                        : 'bg-primary hover:bg-primary/90 text-white hover:scale-105'
                    }`}
                  >
                    Subscribe Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Combo Selection */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground mb-8">Choose Your Combo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pantryBoxes.map((combo, idx) => (
                <div
                  key={combo.id}
                  className="p-6 rounded-xl border-2 border-primary/20 hover:border-primary bg-white transition-all animate-fadeInUp"
                  style={{ animationDelay: `${(idx + 2) * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">{combo.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{combo.description}</p>
                  <p className="text-2xl font-bold text-primary mb-4">₹{combo.price}/month</p>
                  <button
                    onClick={() => {
                      combo.items.forEach((item) => {
                        // Add combo items to cart
                      });
                      router.push('/checkout');
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
