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
 *   - Rate limiting: max 5 attempts per minute to prevent brute-force
 *   - Discount can never exceed order total
 *   - Discount can never be negative
 *   - Final amount can never go below Re.1
 */

export type CouponType = 'affiliate' | 'subscription';
export type DiscountMode = 'percentage' | 'flat';

export interface Coupon {
  code: string;
  type: CouponType;
  discountMode: DiscountMode;
  discountValue: number;       // percentage (0-100) or flat amount in INR
  maxDiscount: number;         // cap in INR - prevents runaway discounts
  minOrderValue: number;       // minimum cart total to activate
  description: string;         // human-readable label
  expiresAt: string | null;    // ISO date string, null = never expires
  isActive: boolean;           // master kill-switch
  usageLimit: number | null;   // null = unlimited
  usageCount: number;          // how many times it has been used so far
  affiliateName?: string;      // only for affiliate type
}

// -- Coupon Registry -----------------------------------------
// In production this would come from a database. Keeping it
// in-memory here so you can test without a backend.
export const couponRegistry: Coupon[] = [
  // -- Affiliate Marketing Coupons ---------------------------
  {
    code: 'FRIEND10',
    type: 'affiliate',
    discountMode: 'percentage',
    discountValue: 10,
    maxDiscount: 200,
    minOrderValue: 500,
    description: '10% off (max Rs.200) - Affiliate Referral',
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
    description: '15% off (max Rs.300) - Instagram Affiliate',
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
    description: '20% off (max Rs.400) - YouTube Affiliate',
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
    description: 'Flat Rs.50 off - Affiliate Promo',
    expiresAt: '2027-12-31T23:59:59Z',
    isActive: true,
    usageLimit: null,
    usageCount: 0,
    affiliateName: 'General Promo',
  },

  // -- 6-Month Subscription Coupons -------------------------
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
    description: '15% off (max Rs.400) - 6 Month Subscription',
    expiresAt: null,
    isActive: true,
    usageLimit: null,
    usageCount: 0,
  },
];

// -- Validation Result ---------------------------------------
export interface CouponValidationResult {
  valid: boolean;
  error: string | null;
  coupon: Coupon | null;
  discountAmount: number;
  couponTypeLabel: string | null; // "AFFILIATE MARKETING" or "6 MONTH SUBSCRIPTION"
}

// -- Rate Limiting -------------------------------------------
// Prevents brute-force coupon code guessing (max 5 attempts/min)
const attemptLog: { timestamp: number }[] = [];
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000; // 1 minute

function isRateLimited(): boolean {
  const now = Date.now();
  // Remove entries older than the window
  while (attemptLog.length > 0 && now - attemptLog[0].timestamp > WINDOW_MS) {
    attemptLog.shift();
  }
  if (attemptLog.length >= MAX_ATTEMPTS) {
    return true;
  }
  attemptLog.push({ timestamp: now });
  return false;
}

// -- Helper: get coupon type label ---------------------------
function getCouponTypeLabel(type: CouponType): string {
  switch (type) {
    case 'affiliate':
      return 'AFFILIATE MARKETING';
    case 'subscription':
      return '6 MONTH SUBSCRIPTION';
    default:
      return 'COUPON';
  }
}

// -- Core Validator ------------------------------------------
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
    couponTypeLabel: null,
  });

  // 0. Rate limit check (prevents brute-force guessing)
  if (isRateLimited()) {
    return FAIL('Too many attempts. Please wait a minute before trying again.');
  }

  // 1. Sanitise input
  const sanitised = code.trim().toUpperCase();
  if (!sanitised) {
    return FAIL('Please enter a coupon code.');
  }

  // 1b. Input length check (no coupon code is longer than 20 chars)
  if (sanitised.length > 20) {
    return FAIL('Invalid coupon code. Please check and try again.');
  }

  // 1c. Only allow alphanumeric characters and hyphens
  if (!/^[A-Z0-9-]+$/.test(sanitised)) {
    return FAIL('Invalid coupon code format.');
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
    if (isNaN(expires.getTime())) {
      // Corrupted expiry date - fail safe
      return FAIL('This coupon cannot be validated right now. Please contact support.');
    }
    if (now > expires) {
      return FAIL('This coupon has expired.');
    }
  }

  // 5. Usage limit check
  if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
    return FAIL('This coupon has reached its usage limit.');
  }

  // 6. Order total must be a valid positive number
  if (typeof orderTotal !== 'number' || isNaN(orderTotal) || orderTotal <= 0) {
    return FAIL('Unable to apply coupon to this order.');
  }

  // 7. Minimum order value check
  if (orderTotal < coupon.minOrderValue) {
    return FAIL(
      `Minimum order of Rs.${coupon.minOrderValue} required. Your total is Rs.${Math.round(orderTotal)}.`
    );
  }

  // 8. Calculate discount (with multiple safety caps)
  let discountAmount: number;

  if (coupon.discountMode === 'percentage') {
    // Validate percentage range (0-100)
    const safePercent = Math.min(Math.max(coupon.discountValue, 0), 100);
    discountAmount = Math.round((orderTotal * safePercent) / 100);
  } else if (coupon.discountMode === 'flat') {
    discountAmount = Math.round(coupon.discountValue);
  } else {
    // Unknown discount mode - fail safe
    return FAIL('This coupon cannot be applied. Please contact support.');
  }

  // 9. SAFETY CAP 1: never exceed maxDiscount
  discountAmount = Math.min(discountAmount, coupon.maxDiscount);

  // 10. SAFETY CAP 2: discount can never exceed order total
  discountAmount = Math.min(discountAmount, orderTotal);

  // 11. SAFETY CAP 3: discount must be a positive integer (floor to avoid rounding up)
  discountAmount = Math.max(0, Math.floor(discountAmount));

  // 12. SAFETY CAP 4: absolute maximum discount is Rs.500 across ALL coupons
  const ABSOLUTE_MAX_DISCOUNT = 500;
  discountAmount = Math.min(discountAmount, ABSOLUTE_MAX_DISCOUNT);

  // 13. Final sanity check - if somehow discount is negative, zero it out
  if (discountAmount < 0) {
    discountAmount = 0;
  }

  return {
    valid: true,
    error: null,
    coupon,
    discountAmount,
    couponTypeLabel: getCouponTypeLabel(coupon.type),
  };
}

// -- Calculate final amount ----------------------------------
// Double-check function to ensure we never charge negative.
// Also serves as a safety net against any tampering.
export function calculateFinalAmount(
  orderTotal: number,
  discountAmount: number
): number {
  // Validate inputs
  if (typeof orderTotal !== 'number' || isNaN(orderTotal) || orderTotal <= 0) {
    return Math.max(1, Math.round(orderTotal || 0));
  }
  if (typeof discountAmount !== 'number' || isNaN(discountAmount) || discountAmount < 0) {
    return Math.round(orderTotal);
  }

  // Discount can never exceed order total
  const safeDiscount = Math.min(discountAmount, orderTotal);

  const final = orderTotal - safeDiscount;

  // Safety: never go below Re.1
  return Math.max(1, Math.round(final));
}

// -- Verify discount integrity --------------------------------
// Call this before payment to verify the discount hasn't been tampered with.
// Recalculates from scratch and compares.
export function verifyDiscountIntegrity(
  couponCode: string,
  orderTotal: number,
  claimedDiscount: number
): { verified: boolean; correctDiscount: number; error: string | null } {
  const result = validateCoupon(couponCode, orderTotal);

  if (!result.valid) {
    return {
      verified: false,
      correctDiscount: 0,
      error: result.error,
    };
  }

  // Check if claimed discount matches what we calculate
  if (claimedDiscount !== result.discountAmount) {
    return {
      verified: false,
      correctDiscount: result.discountAmount,
      error: `Discount mismatch detected. Expected Rs.${result.discountAmount}, got Rs.${claimedDiscount}.`,
    };
  }

  return {
    verified: true,
    correctDiscount: result.discountAmount,
    error: null,
  };
}
