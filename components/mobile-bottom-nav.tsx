'use client';

import { Home, LayoutGrid, ShoppingBag, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from './shopping-cart';
import type { CartItem } from '@/hooks/use-cart';

interface MobileBottomNavProps {
  cartItems: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: LayoutGrid, label: 'Boxes', href: '/#pantry-boxes' },
  { icon: ShoppingBag, label: 'Cart', href: '#cart' },
  { icon: User, label: 'Account', href: '/login' },
  { icon: MessageCircle, label: 'Chat', href: 'https://wa.me/919876543210' },
];

export function MobileBottomNav({ cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }: MobileBottomNavProps) {
  const pathname = usePathname();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#14532d] md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.3)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.replace('/#', '/'));
          const isCart = item.label === 'Cart';
          const isChat = item.label === 'Chat';

          /* ---- Cart button triggers the ShoppingCart sheet ---- */
          if (isCart) {
            return (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center py-2 flex-1"
              >
                <div className="relative flex flex-col items-center">
                  {/* Active highlight border around the cart icon */}
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl border-2 border-mustard/80 bg-[#14532d]">
                    <ShoppingCart
                      items={cartItems}
                      onRemove={onRemoveFromCart}
                      onUpdateQuantity={onUpdateQuantity}
                      onCheckout={onCheckout}
                    />
                  </div>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-mustard text-mustard-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-white mt-0.5">
                  {item.label}
                </span>
              </div>
            );
          }

          /* ---- Chat opens WhatsApp externally ---- */
          if (isChat) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-2 flex-1 min-h-[56px] active:bg-white/10 transition-colors"
                aria-label={item.label}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-mustard' : 'text-white/80'}`} />
                <span className={`text-[10px] font-semibold mt-0.5 ${isActive ? 'text-mustard' : 'text-white/80'}`}>
                  {item.label}
                </span>
              </a>
            );
          }

          /* ---- Regular nav links ---- */
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center py-2 flex-1 min-h-[56px] active:bg-white/10 transition-colors"
              aria-label={item.label}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-mustard' : 'text-white/80'}`} />
              <span className={`text-[10px] font-semibold mt-0.5 ${isActive ? 'text-mustard' : 'text-white/80'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
