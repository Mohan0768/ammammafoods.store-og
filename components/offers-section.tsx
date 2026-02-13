'use client';

export function OffersSection() {
  const offers = [
    { id: 1, text: 'NEW: Bachelor Box at Rs.999 - Perfect for Students', badge: 'NEW' },
    { id: 2, text: 'SALE: Family Box - Serves 4, 25% OFF this week', badge: 'HOT' },
    { id: 3, text: 'Subscribe to 6-month plan and save 20%', badge: 'SAVE' },
    { id: 4, text: '50,000+ Happy Customers - Join Now', badge: 'POPULAR' },
    { id: 5, text: 'FREE SHIPPING on orders above Rs.2000', badge: 'OFFER' },
  ];

  const mobileMessages = [
    'Minimum order value is Rs.250/-',
    'COD Available for all orders',
    'FREE SHIPPING on orders above Rs.2000',
    'Fresh & Handmade Masalas',
  ];

  return (
    <>
      {/* ===================== MOBILE BANNER ===================== */}
      <div className="lg:hidden relative w-full bg-[#1a5e2a] py-2.5 overflow-hidden">
        <div className="flex animate-marquee-mobile whitespace-nowrap">
          {[...mobileMessages, ...mobileMessages, ...mobileMessages].map((msg, idx) => (
            <span key={idx} className="flex items-center gap-4 px-4 flex-shrink-0">
              <span className="text-white font-bold text-sm">{msg}</span>
              <span className="text-white/50 font-bold text-sm">|</span>
            </span>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee-mobile {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-marquee-mobile {
            animation: marquee-mobile 20s linear infinite;
          }
        `}</style>
      </div>

      {/* ===================== DESKTOP BANNER ===================== */}
      <div className="hidden lg:block relative w-full bg-gradient-to-r from-primary to-secondary py-3 overflow-hidden">
        <div className="flex animate-scroll-desktop whitespace-nowrap">
          {[...offers, ...offers].map((offer, idx) => (
            <div key={idx} className="flex items-center gap-4 px-8 flex-shrink-0">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
                {offer.badge}
              </span>
              <span className="text-white font-semibold text-sm">{offer.text}</span>
              <span className="text-white text-xl">{'•'}</span>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes scroll-desktop {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-desktop {
            animation: scroll-desktop 30s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
}
