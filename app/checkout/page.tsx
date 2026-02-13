'use client';

import React, { Suspense, useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/hooks/use-cart';
import {
  validateCoupon,
  calculateFinalAmount,
  verifyDiscountIntegrity,
  type CouponValidationResult,
} from '@/lib/coupons';
import {
  ArrowLeft,
  CheckCircle,
  Shield,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  Lock,
  Package,
  Tag,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';
  const { items, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // ── Coupon State ──────────────────────────────────────
  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState<CouponValidationResult | null>(null);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  // ── Derived totals ────────────────────────────────────
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const discountAmount = couponApplied && couponResult?.valid ? couponResult.discountAmount : 0;
  const finalTotal = calculateFinalAmount(subtotal, discountAmount);

  // ── Handlers ──────────────────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = useCallback(() => {
    if (!couponCode.trim()) return;

    setIsCouponLoading(true);
    setCouponResult(null);
    setCouponApplied(false);

    // Simulate network delay for realistic UX (in production, this would be an API call)
    setTimeout(() => {
      const result = validateCoupon(couponCode, subtotal);
      setCouponResult(result);

      if (result.valid) {
        setCouponApplied(true);
      }

      setIsCouponLoading(false);
    }, 600);
  }, [couponCode, subtotal]);

  const handleRemoveCoupon = useCallback(() => {
    setCouponCode('');
    setCouponResult(null);
    setCouponApplied(false);
  }, []);

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── Re-validate coupon before payment (CRITICAL) ────
    // Prevents race conditions where a coupon expires mid-checkout
    // Also verifies discount integrity to prevent tampering
    if (couponApplied && couponResult?.coupon) {
      const integrity = verifyDiscountIntegrity(
        couponResult.coupon.code,
        subtotal,
        couponResult.discountAmount
      );

      if (!integrity.verified) {
        // Discount was tampered with or coupon is no longer valid
        const recheck = validateCoupon(couponResult.coupon.code, subtotal);
        if (!recheck.valid) {
          setCouponResult(recheck);
          setCouponApplied(false);
          return; // Block payment - coupon no longer valid
        }
        // Coupon is still valid but discount amount changed - update it
        setCouponResult(recheck);
        return; // Force user to review the updated discount before paying
      }
    }

    setIsProcessing(true);

    try {
      // ============================================
      // RAZORPAY INTEGRATION PLACEHOLDER
      // ============================================
      // When you connect your Razorpay account, replace this block with:
      //
      // const actualTotal = calculateFinalAmount(subtotal, discountAmount);
      //
      // 1. Call your API to create a Razorpay order:
      //    const res = await fetch('/api/create-order', {
      //      method: 'POST',
      //      body: JSON.stringify({
      //        amount: actualTotal * 100,  // Razorpay expects paise
      //        currency: 'INR',
      //        couponCode: couponApplied ? couponResult?.coupon?.code : null,
      //        discountAmount: discountAmount,
      //      }),
      //    });
      //    const order = await res.json();
      //
      // 2. IMPORTANT: Server must ALSO validate the coupon and
      //    recalculate the amount server-side. Never trust client amounts.
      //
      // 3. Open Razorpay checkout:
      //    const options = {
      //      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      //      amount: order.amount,
      //      currency: order.currency,
      //      name: 'Ammamma Foods',
      //      description: 'Pantry Box Order',
      //      order_id: order.id,
      //      prefill: {
      //        name: formData.fullName,
      //        email: formData.email,
      //        contact: formData.phone,
      //      },
      //      handler: function (response) {
      //        // Verify payment on server, THEN mark coupon as used
      //        router.push('/checkout?success=true');
      //      },
      //    };
      //    const rzp = new window.Razorpay(options);
      //    rzp.open();
      // ============================================

      // Simulated payment flow
      await new Promise((resolve) => setTimeout(resolve, 2000));
      clearCart();
      router.push('/checkout?success=true');
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  // Success Page
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header cartItems={[]} onRemoveFromCart={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2 leading-relaxed">
              Thank you for your purchase. Your pantry box is being prepared with love.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              You will receive an email with your tracking details soon.
            </p>
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-bold rounded-xl"
            >
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartItems={items} onRemoveFromCart={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />

      <main className="flex-1 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Checkout Form - 3 cols */}
            <div className="lg:col-span-3">
              <Card className="p-5 sm:p-8 border-border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Checkout</h1>
                    <p className="text-sm text-muted-foreground">Secure payment powered by Razorpay</p>
                  </div>
                </div>

                <form onSubmit={handleRazorpayPayment} className="space-y-6">
                  {/* Contact Details */}
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">1</span>
                      Contact Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="email">Email (optional)</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">2</span>
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="House no, Street name, Area"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            placeholder="Chennai"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            placeholder="Tamil Nadu"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            placeholder="600001"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">3</span>
                      Payment
                    </h2>

                    {/* Payment Method Icons */}
                    <div className="p-4 bg-muted/50 rounded-xl border border-border mb-4">
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                        Accepted Payment Methods
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { icon: Smartphone, label: 'UPI' },
                          { icon: CreditCard, label: 'Cards' },
                          { icon: Landmark, label: 'Net Banking' },
                          { icon: Wallet, label: 'Wallets' },
                        ].map((method) => (
                          <div
                            key={method.label}
                            className="flex items-center gap-1.5 px-3 py-2 bg-card rounded-lg border border-border"
                          >
                            <method.icon className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-foreground">{method.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <p className="text-xs">
                        Your payment is secured with 256-bit SSL encryption
                      </p>
                    </div>
                  </div>

                  {/* Razorpay Pay Button */}
                  <button
                    type="submit"
                    disabled={isProcessing || items.length === 0}
                    className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#072654',
                      color: '#ffffff',
                    }}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Payment...
                      </span>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        {`Pay Rs.${finalTotal} with Razorpay`}
                      </>
                    )}
                  </button>

                  {/* Razorpay branding */}
                  <p className="text-center text-xs text-muted-foreground">
                    Powered by <span className="font-bold" style={{ color: '#072654' }}>Razorpay</span> - India&#39;s most trusted payment gateway
                  </p>
                </form>
              </Card>
            </div>

            {/* Order Summary - 2 cols */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">
                <Card className="p-5 sm:p-6 border-border">
                  <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <ShoppingCartIcon />
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="space-y-3 mb-6 max-h-72 overflow-y-auto">
                    {items.length === 0 ? (
                      <div className="py-8 text-center">
                        <Package className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Your cart is empty</p>
                        <Button
                          variant="link"
                          onClick={() => router.push('/custom-box')}
                          className="text-primary mt-1"
                        >
                          Build a Pantry Box
                        </Button>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                        >
                          <img
                            src={item.product.image || '/placeholder.svg'}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">{'Qty: '}{item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-primary flex-shrink-0">
                            {'Rs.'}{item.product.price * item.quantity}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-border pt-4 space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{'Subtotal ('}{itemCount}{' items)'}</span>
                      <span className="font-medium text-foreground">{'Rs.'}{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>

                    {/* Coupon Discount Line */}
                    {couponApplied && couponResult?.valid && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {'Coupon ('}{couponResult.coupon?.code}{')'}
                        </span>
                        <span className="font-bold text-green-600">{'-Rs.'}{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium text-foreground">Included</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl pt-3 border-t border-border">
                      <span className="text-foreground">Total</span>
                      <div className="text-right">
                        {discountAmount > 0 && (
                          <span className="text-sm line-through text-muted-foreground block font-normal">
                            {'Rs.'}{subtotal}
                          </span>
                        )}
                        <span className="text-primary">{'Rs.'}{finalTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Shield, label: 'Secure Checkout' },
                        { icon: Package, label: 'Free Shipping' },
                      ].map((badge) => (
                        <div
                          key={badge.label}
                          className="flex items-center gap-2 p-2.5 bg-primary/5 rounded-lg"
                        >
                          <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-xs font-semibold text-foreground">{badge.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* ── Coupon Section ────────────────────────── */}
                <Card className="p-5 sm:p-6 border-border">
                  <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    Have a Coupon?
                  </h3>

                  {couponApplied && couponResult?.valid ? (
                    // ── Applied coupon display ──
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            {couponResult.couponTypeLabel && (
                              <p className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-0.5">
                                {couponResult.couponTypeLabel}
                              </p>
                            )}
                            <p className="text-sm font-bold text-green-700">
                              {couponResult.coupon?.code}
                            </p>
                            <p className="text-xs text-green-600 mt-0.5">
                              {couponResult.coupon?.description}
                            </p>
                            <p className="text-xs font-bold text-green-700 mt-1">
                              {'You save Rs.'}{discountAmount}{'!'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="p-1 hover:bg-green-100 rounded-md transition-colors flex-shrink-0"
                          aria-label="Remove coupon"
                        >
                          <X className="w-4 h-4 text-green-600" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // ── Coupon input ──
                    <div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase());
                            // Clear previous error when user types
                            if (couponResult && !couponResult.valid) {
                              setCouponResult(null);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleApplyCoupon();
                            }
                          }}
                          className="rounded-lg font-mono text-sm uppercase"
                          disabled={isCouponLoading}
                        />
                        <Button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode.trim() || isCouponLoading}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-5 font-bold text-sm flex-shrink-0"
                        >
                          {isCouponLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Apply'
                          )}
                        </Button>
                      </div>

                      {/* Error message */}
                      {couponResult && !couponResult.valid && (
                        <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-red-600 font-medium">
                            {couponResult.error}
                          </p>
                        </div>
                      )}

                      {/* Available coupon hints */}
                      <div className="mt-3 space-y-1.5">
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                          Available Offers
                        </p>
                        {[
                          { code: 'FRIEND10', desc: '10% off on orders above Rs.500', type: 'AFFILIATE MARKETING' },
                          { code: 'SUB6M20', desc: '20% off for 6-month subscribers', type: '6 MONTH SUBSCRIPTION' },
                        ].map((hint) => (
                          <button
                            key={hint.code}
                            type="button"
                            onClick={() => {
                              setCouponCode(hint.code);
                              setCouponResult(null);
                            }}
                            className="w-full text-left p-2 bg-muted/50 hover:bg-muted rounded-lg border border-dashed border-border transition-colors group"
                          >
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                              {hint.type}
                            </span>
                            <span className="text-xs font-bold text-primary font-mono group-hover:underline block mt-0.5">
                              {hint.code}
                            </span>
                            <span className="text-[10px] text-muted-foreground block mt-0.5">
                              {hint.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ShoppingCartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
      />
    </svg>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-pulse text-muted-foreground">Loading checkout...</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
