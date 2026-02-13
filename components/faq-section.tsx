'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'What is a Pantry Box?',
    answer: 'A Pantry Box is a curated collection of our premium masalas and spices designed for different lifestyles. Choose from Bachelor, Family, or NRI boxes, or build your own custom box with your favorite products.',
  },
  {
    id: 2,
    question: 'How many products do I need to select?',
    answer: 'You need to select a minimum of 4 products to build your pantry box. You can add as many as you like beyond that - the price adjusts dynamically based on your selection.',
  },
  {
    id: 3,
    question: 'How is the price calculated?',
    answer: 'The price of your pantry box is the sum of all selected products. Each product has its own price, and your box total updates in real-time as you add or remove items. Shipping is always free!',
  },
  {
    id: 4,
    question: 'Can I customize a pre-built box?',
    answer: 'Yes! Every pantry box comes with default items, but you can swap, add, or remove any products to make it perfect for your kitchen. Click "Customize" on any box to get started.',
  },
  {
    id: 5,
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. Our NRI Box is specially designed for Indian families abroad. Orders are packed securely to maintain freshness during transit.',
  },
  {
    id: 6,
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI, credit/debit cards, net banking, and digital wallets through our secure Razorpay payment gateway. All transactions are protected with 256-bit SSL encryption.',
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">FAQ</p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Do You Have Any<span className="text-primary"> Questions?</span>
          </h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 group ${
                  openId === faq.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-lg pr-4 transition-colors duration-300 ${
                    openId === faq.id ? 'text-primary' : 'text-foreground'
                  }`}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                      openId === faq.id ? 'rotate-180 text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`}
                  />
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? 'max-h-96 mt-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <p className="text-lg text-muted-foreground mb-4">
            Didn&apos;t find your answer?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
