'use client';

import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GlareHover from '@/components/glare-hover';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <GlareHover
        width="100%"
        height="100%"
        background="transparent"
        borderRadius="0"
        borderColor="transparent"
        glareColor="#ffffff"
        glareOpacity={0.2}
        glareAngle={-45}
        glareSize={300}
        transitionDuration={600}
        playOnce={false}
        style={{ aspectRatio: '1/1' }}
      >
        <div className="relative w-full h-full bg-secondary/20 overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </GlareHover>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-secondary text-secondary' : 'text-muted'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary">₹{product.price}</span>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
