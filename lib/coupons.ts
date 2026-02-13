/**
 * Coupon & Discount System
 * ---------------------------------------------------------
 * Two coupon sources:
 *   1. Affiliate marketing codes  (e.g. FRIEND10, INSTA15)
 *   2. 6-month subscription codes (e.g. SUB6M20)
 *
 * Validation rules (STRICT - money is at stake):
 *   - Code must exist in the registry
 *   - Code must not be expired
 *   - Code must not be already used (one-time codes)
 *   - Minimum order value must be met
 *   - Discount is capped at maxDiscount to prevent abuse
 *   - Only ONE coupon can be applied per order
 */

export type CouponType = 'affiliate' | 'subscription';
export type DiscountMode = 'percentage' | 'flat';

export interface Coupon {
  code: string;
  type: CouponType;
  discountMode: DiscountMode;
  discountValue: number;       // percentage (0-100) or flat amount in INR
  maxDiscount: number;         // cap in INR – prevents runaway discounts
  minOrderValue: number;       // minimum cart total to activate
  description: string;         // human-readable label
  expiresAt: string | null;    // ISO date string, null = never expires
  isActive: boolean;           // master kill-switch
  usageLimit: number | null;   // null = unlimited
  usageCount: number;          // how many times it has been used so far
  affiliateName?: string;      // only for affiliate type
}

// ─── Coupon Registry ─────────────────────────────────────
// In production this would come from a database.  Keeping it
// in-memory here so you can test without a backend.
export const couponRegistry: Coupon[] = [
  // ── Affiliate coupons ──────────────────────────────────
  {
    code: 'FRIEND10',
    type: 'affiliate',
    discountMode: 'percentage',
    discountValue: 10,
    maxDiscount: 200,
    minOrderValue: 500,
    description: '10% off (max Rs.200) - Referral',
    expiresAt: '2027-12-31T23:59:59Z',
    isActive: true,
    usageLimit: 100,
    usageCount: 0,
    affiliateName: 'Referral Program',
  },
  {
    code: 'INSTA15',
    type: 'affiliate',
    discountMode: 'percentage',
    discountValue: 15,
    maxDiscount: 300,
    minOrderValue: 800,
    description: '15% off (max Rs.300) - Instagram',
    expiresAt: '2027-06-30T23:59:59Z',
    isActive: true,
    usageLimit: 50,
    usageCount: 0,
    affiliateName: 'Instagram Influencer',
  },
  {
    code: 'YOUTUBE20',
    type: 'affiliate',
    discountMode: 'percentage',
    discountValue: 20,
    maxDiscount: 400,
    minOrderValue: 1000,
    description: '20% off (max Rs.400) - YouTube',
    expiresAt: '2027-06-30T23:59:59Z',
    isActive: true,
    usageLimit: 30,
    usageCount: 0,
    affiliateName: 'YouTube Creator',
  },
  {
    code: 'FLAT50',
    type: 'affiliate',
    discountMode: 'flat',
    discountValue: 50,
    maxDiscount: 50,
    minOrderValue: 400,
    description: 'Flat Rs.50 off',
    expiresAt: '2027-12-31T23:59:59Z',
    isActive: true,
    usageLimit: null,
    usageCount: 0,
    affiliateName: 'General Promo',
  },

  // ── 6-Month Subscription coupons ───────────────────────
  {
    code: 'SUB6M20',
    type: 'subscription',
    discountMode: 'percentage',
    discountValue: 20,
    maxDiscount: 500,
    minOrderValue: 999,
    description: '20% off (max Rs.500) - 6 Month Subscriber',
    expiresAt: null,
    isActive: true,
    usageLimit: null,
    usageCount: 0,
  },
  {
    code: 'SUBSCRIBE15',
    type: 'subscription',
    discountMode: 'percentage',
    discountValue: 15,
    maxDiscount: 400,
    minOrderValue: 600,
    description: '15% off (max Rs.400) - Subscription',
    expiresAt: null,
    isActive: true,
    usageLimit: null,
    usageCount: 0,
  },
];

// ─── Validation Result ───────────────────────────────────
export interface CouponValidationResult {
  valid: boolean;
  error: string | null;
  coupon: Coupon | null;
  discountAmount: number;
}

// ─── Core Validator ──────────────────────────────────────
// This is the SINGLE source of truth for coupon validation.
// Every discount path goes through this function.
export function validateCoupon(
  code: string,
  orderTotal: number
): CouponValidationResult {
  const FAIL = (error: string): CouponValidationResult => ({
    valid: false,
    error,
    coupon: null,
    discountAmount: 0,
  });

  // 1. Sanitise input
  const sanitised = code.trim().toUpperCase();
  if (!sanitised) {
    return FAIL('Please enter a coupon code.');
  }

  // 2. Look up coupon
  const coupon = couponRegistry.find((c) => c.code === sanitised);
  if (!coupon) {
    return FAIL('Invalid coupon code. Please check and try again.');
  }

  // 3. Active check
  if (!coupon.isActive) {
    return FAIL('This coupon is no longer active.');
  }

  // 4. Expiry check
  if (coupon.expiresAt) {
    const now = new Date();
    const expires = new Date(coupon.expiresAt);
    if (now > expires) {
      return FAIL('This coupon has expired.');
    }
  }

  // 5. Usage limit check
  if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
    return FAIL('This coupon has reached its usage limit.');
  }

  // 6. Minimum order value check
  if (orderTotal < coupon.minOrderValue) {
    return FAIL(
      `Minimum order of Rs.${coupon.minOrderValue} required. Your total is Rs.${orderTotal}.`
    );
  }

  // 7. Calculate discount (with safety cap)
  let discountAmount: number;
  if (coupon.discountMode === 'percentage') {
    discountAmount = Math.round((orderTotal * coupon.discountValue) / 100);
    // Cap at maxDiscount
    discountAmount = Math.min(discountAmount, coupon.maxDiscount);
  } else {
    discountAmount = coupon.discountValue;
    // Cap at maxDiscount (should be same for flat, but safety first)
    discountAmount = Math.min(discountAmount, coupon.maxDiscount);
  }

  // 8. CRITICAL: discount can never exceed order total
  discountAmount = Math.min(discountAmount, orderTotal);

  // 9. CRITICAL: discount must be a positive integer
  discountAmount = Math.max(0, Math.round(discountAmount));

  return {
    valid: true,
    error: null,
    coupon,
    discountAmount,
  };
}

// ─── Calculate final amount ──────────────────────────────
// Double-check function to ensure we never charge negative
export function calculateFinalAmount(
  orderTotal: number,
  discountAmount: number
): number {
  const final = orderTotal - discountAmount;
  // Safety: never go below zero, never go below 1 rupee
  return Math.max(1, Math.round(final));
}
