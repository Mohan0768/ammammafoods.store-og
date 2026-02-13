'use client';

import { useState } from 'react';

export type Currency = 'INR' | 'USD' | 'GBP' | 'EUR';

const exchangeRates: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0095,
  EUR: 0.011,
};

const currencySymbols: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  EUR: '€',
};

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('INR');

  const convertPrice = (priceInINR: number): number => {
    return Math.round(priceInINR * exchangeRates[currency] * 100) / 100;
  };

  const formatPrice = (priceInINR: number): string => {
    const converted = convertPrice(priceInINR);
    return `${currencySymbols[currency]}${converted.toFixed(2)}`;
  };

  const getSymbol = (): string => {
    return currencySymbols[currency];
  };

  return {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    getSymbol,
    availableCurrencies: Object.keys(exchangeRates) as Currency[],
  };
}
