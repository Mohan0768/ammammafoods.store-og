'use client';

import { useState } from 'react';
import { ProductCard } from './product-card';
import { products } from '@/lib/products';
import type { Product } from '@/lib/products';

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
}

export function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filteredProducts = selectedCategory === 'All' ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fadeInUp">
          <p className="text-primary font-bold text-sm uppercase tracking-wider">Our Collection</p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Premium Spice <span className="text-primary">Blends</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Carefully crafted masala blends for every occasion, made with the finest ingredients and traditional methods. Experience authentic Indian flavors.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                  : 'bg-muted text-foreground hover:bg-primary/10'
              } hover:shadow-md`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
