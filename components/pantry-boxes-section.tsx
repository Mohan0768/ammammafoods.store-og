"use client";

import { pantryBoxes, products } from '@/lib/products';
import { useRouter } from 'next/navigation';
import { Star, Package, ChevronRight, Users, Sparkles } from 'lucide-react';
import GlareHover from '@/components/glare-hover';

const boxIcons: Record<string, typeof Users> = {
  'combo-1': Sparkles,
  'combo-2': Users,
  'combo-3': Package,
};

export function PantryBoxesSection() {
  const router = useRouter();

  const getBoxPrice = (items: string[]) => {
    return items.reduce((total, itemName) => {
      const product = products.find(p => p.name === itemName);
      return total + (product?.price || 0);
    }, 0);
  };

  return (
    <section id="pantry-boxes" className="w-full bg-background py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
            Curated For You
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Choose Your <span className="text-primary">Pantry Box</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hand-picked spice combinations for every lifestyle. Select a box, customize it your way,
            and pay only for what you pick.
          </p>
        </div>

        {/* Pantry Box Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pantryBoxes.map((box, idx) => {
            const Icon = boxIcons[box.id] || Package;
            const dynamicPrice = getBoxPrice(box.items);

            return (
              <div
                key={box.id}
                className="group animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Image Section */}
                  <div className="relative">
                    <GlareHover
                      width="100%"
                      height="100%"
                      background="transparent"
                      borderRadius="0"
                      borderColor="transparent"
                      glareColor="#ffffff"
                      glareOpacity={0.25}
                      glareAngle={-45}
                      glareSize={350}
                      transitionDuration={600}
                      playOnce={false}
                      style={{ height: '220px' }}
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={box.image || "/placeholder.svg"}
                          alt={box.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>
                    </GlareHover>

                    {/* Servings Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-secondary text-foreground px-3 py-1.5 rounded-full font-bold text-xs shadow-lg">
                      <Icon className="w-3.5 h-3.5" />
                      Serves {box.servings}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(box.rating)
                                  ? 'fill-secondary text-secondary'
                                  : 'text-muted-foreground/30'
                              }`}
                            />
                          ))}
                      </div>
                      <span className="text-xs font-bold text-foreground">{box.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{box.name}</h3>
                    <p className="text-sm text-muted-foreground mb-5">{box.description}</p>

                    {/* Default Items */}
                    <div className="mb-5 p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                        Default Items ({box.items.length})
                      </p>
                      <ul className="space-y-1.5">
                        {box.items.map((item, i) => {
                          const product = products.find(p => p.name === item);
                          return (
                            <li key={i} className="text-sm text-foreground flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                {item}
                              </span>
                              {product && (
                                <span className="text-xs font-semibold text-muted-foreground">
                                  Rs.{product.price}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Starting at</p>
                        <p className="text-3xl font-black text-primary">
                          Rs.{dynamicPrice}
                        </p>
                      </div>
                      <button
                        onClick={() => router.push(`/custom-box?box=${box.id}`)}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                      >
                        Customize
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Build From Scratch CTA */}
        <div className="mt-12 text-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl border border-primary/15">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">Want something unique?</h3>
              <p className="text-muted-foreground text-sm">
                Build your own pantry box from scratch - pick any 4 or more products
              </p>
            </div>
            <button
              onClick={() => router.push('/custom-box')}
              className="flex-shrink-0 flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <Package className="w-4 h-4" />
              Build Custom Box
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
