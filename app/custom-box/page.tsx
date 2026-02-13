'use client';

import { useState, useMemo, Suspense } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/hooks/use-cart';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Package,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Star,
} from 'lucide-react';
import { products, pantryBoxes } from '@/lib/products';

const MIN_PRODUCTS = 4;

function CustomBoxContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boxParam = searchParams.get('box');
  const { items, addToCart, removeFromCart, updateQuantity } = useCart();

  // Find pre-selected box
  const preselectedBox = boxParam ? pantryBoxes.find((b) => b.id === boxParam) : null;

  // Initialize selected products from box defaults
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(() => {
    const initial = new Map<string, number>();
    if (preselectedBox) {
      preselectedBox.items.forEach((itemName) => {
        const product = products.find((p) => p.name === itemName);
        if (product) {
          initial.set(product.id, 1);
        }
      });
    }
    return initial;
  });

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const toggleProduct = (productId: string) => {
    const newSelected = new Map(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.set(productId, 1);
    }
    setSelectedProducts(newSelected);
  };

  const updateProductQty = (productId: string, qty: number) => {
    const newSelected = new Map(selectedProducts);
    if (qty > 0) {
      newSelected.set(productId, qty);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
  };

  const selectedCount = selectedProducts.size;
  const canProceed = selectedCount >= MIN_PRODUCTS;

  const totalPrice = useMemo(() => {
    return Array.from(selectedProducts.entries()).reduce((total, [id, qty]) => {
      const product = products.find((p) => p.id === id);
      return total + (product?.price || 0) * qty;
    }, 0);
  }, [selectedProducts]);

  const totalItems = useMemo(() => {
    return Array.from(selectedProducts.values()).reduce((a, b) => a + b, 0);
  }, [selectedProducts]);

  const handleProceedToPayment = () => {
    if (!canProceed) return;

    // Add selected products to cart
    selectedProducts.forEach((qty, productId) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        for (let i = 0; i < qty; i++) {
          addToCart(product);
        }
      }
    });

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

      <main className="flex-1 py-8 sm:py-16 pb-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button & Title */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/#pantry-boxes"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-medium text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pantry Boxes
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  {preselectedBox ? `Customize ${preselectedBox.name}` : 'Build Your Pantry Box'}
                </h1>
                <p className="text-muted-foreground mt-2 text-base sm:text-lg">
                  {preselectedBox
                    ? 'Swap or add products to make it yours'
                    : 'Pick at least 4 products to create your perfect box'}
                </p>
              </div>

              {/* Selection Progress - Desktop */}
              <div className="hidden sm:block flex-shrink-0">
                <SelectionProgress count={selectedCount} min={MIN_PRODUCTS} />
              </div>
            </div>
          </div>

          {/* Selection Progress - Mobile (sticky) */}
          <div className="sm:hidden sticky top-14 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-border mb-6">
            <SelectionProgress count={selectedCount} min={MIN_PRODUCTS} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Select Products</h2>
                <span className="text-sm text-muted-foreground">{products.length} available</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {products.map((product, idx) => {
                  const isSelected = selectedProducts.has(product.id);
                  const quantity = selectedProducts.get(product.id) || 0;

                  return (
                    <div
                      key={product.id}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 animate-fadeInUp ${
                        isSelected
                          ? 'border-primary shadow-lg shadow-primary/10 bg-card'
                          : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
                      }`}
                      style={{ animationDelay: `${idx * 0.04}s` }}
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          className={`w-full h-28 sm:h-36 object-cover transition-transform duration-500 ${
                            isSelected ? 'scale-105' : 'hover:scale-105'
                          }`}
                        />

                        {/* Selection Check */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg animate-scaleIn">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}

                        {/* Rating */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-0.5 rounded-md">
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <span className="text-[10px] font-bold text-foreground">{product.rating}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <h3 className="font-bold text-sm text-foreground line-clamp-1 mb-0.5">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                          {product.description}
                        </p>
                        <p className="text-sm font-bold text-primary mb-2">Rs.{product.price}</p>

                        {isSelected ? (
                          <div className="flex items-center gap-1 bg-primary/10 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateProductQty(product.id, quantity - 1)}
                              className="flex-1 py-2 text-primary hover:bg-primary/20 transition-all flex items-center justify-center"
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-bold text-foreground px-3 min-w-[32px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateProductQty(product.id, quantity + 1)}
                              className="flex-1 py-2 text-primary hover:bg-primary/20 transition-all flex items-center justify-center"
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleProduct(product.id)}
                            className="w-full py-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-bold text-xs rounded-lg transition-all duration-300 flex items-center justify-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add to Box
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-5 sm:p-6 bg-card rounded-2xl border border-border shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Your Box</h3>
                    <p className="text-xs text-muted-foreground">
                      {preselectedBox ? preselectedBox.name : 'Custom Box'}
                    </p>
                  </div>
                </div>

                {/* Minimum requirement warning */}
                {!canProceed && (
                  <div className="mb-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground">
                      Select at least <strong>{MIN_PRODUCTS} products</strong> to proceed.
                      You need <strong>{MIN_PRODUCTS - selectedCount} more</strong>.
                    </p>
                  </div>
                )}

                {/* Selected Items */}
                <div className="max-h-56 overflow-y-auto mb-4 scrollbar-hide">
                  {selectedProducts.size === 0 ? (
                    <div className="py-8 text-center">
                      <ShoppingCart className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No products selected yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Array.from(selectedProducts.entries()).map(([productId, qty]) => {
                        const product = products.find((p) => p.id === productId);
                        if (!product) return null;
                        return (
                          <div
                            key={productId}
                            className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <img
                                src={product.image || '/placeholder.svg'}
                                alt={product.name}
                                className="w-8 h-8 rounded-md object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">
                                  {product.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  Rs.{product.price} x {qty}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className="text-sm font-bold text-primary">
                                Rs.{product.price * qty}
                              </span>
                              <button
                                onClick={() => updateProductQty(productId, 0)}
                                className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                                aria-label={`Remove ${product.name}`}
                              >
                                <span className="text-xs font-bold">x</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Divider & Totals */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Products selected</span>
                    <span className="font-semibold text-foreground">{selectedCount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Total items</span>
                    <span className="font-semibold text-foreground">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-black text-primary">Rs.{totalPrice}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleProceedToPayment}
                  disabled={!canProceed}
                  className={`w-full mt-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    canProceed
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                  {canProceed
                    ? `Proceed to Payment - Rs.${totalPrice}`
                    : `Select ${MIN_PRODUCTS - selectedCount} more product${MIN_PRODUCTS - selectedCount !== 1 ? 's' : ''}`}
                </button>

                <Link
                  href="/"
                  className="block text-center mt-3 text-primary font-semibold text-sm hover:underline"
                >
                  Continue Browsing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SelectionProgress({ count, min }: { count: number; min: number }) {
  const progress = Math.min((count / min) * 100, 100);
  const isMet = count >= min;

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {Array.from({ length: min }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < count ? 'bg-primary scale-110' : 'bg-border'
            }`}
          />
        ))}
        {count > min &&
          Array.from({ length: count - min }).map((_, i) => (
            <div
              key={`extra-${i}`}
              className="w-3 h-3 rounded-full bg-secondary scale-110 transition-all duration-300"
            />
          ))}
      </div>
      <span
        className={`text-sm font-bold ${
          isMet ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        {count}/{min} min
        {isMet && ' - Ready!'}
      </span>
    </div>
  );
}

export default function CustomBoxPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <CustomBoxContent />
    </Suspense>
  );
}
