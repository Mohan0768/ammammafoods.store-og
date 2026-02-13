'use client';

import { useEffect, useState, useRef } from 'react';
import { Search, LogOut, User, Menu, ChevronDown, Package } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from './shopping-cart';
import { useAuth } from '@/hooks/use-auth';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { CartItem } from '@/hooks/use-cart';

interface HeaderProps {
  cartItems: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

const pantryBoxDropdownItems = [
  { href: '/custom-box?box=combo-1', label: 'Bachelor Box', desc: 'Perfect for singles' },
  { href: '/custom-box?box=combo-2', label: 'Family Box', desc: 'Serves a family of 4' },
  { href: '/custom-box?box=combo-3', label: 'NRI Box', desc: 'Authentic flavors abroad' },
  { href: '/custom-box', label: 'Custom Box', desc: 'Build your own box' },
];

export function Header({ cartItems, onRemoveFromCart, onUpdateQuantity, onCheckout }: HeaderProps) {
  const router = useRouter();
  const { user, logout, restoreSession } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPantryDropdown, setShowPantryDropdown] = useState(false);
  const pantryDropdownRef = useRef<HTMLDivElement>(null);
  const pantryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/#pantry-boxes', label: 'PANTRY BOXES' },
    { href: '/#about', label: 'ABOUT' },
    { href: '/#story', label: 'OUR STORY' },
    { href: '/#contact', label: 'CONTACT' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-card border-b border-border/60 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      {/* ===================== MOBILE HEADER ===================== */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Left: Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-1.5 text-foreground" aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-card p-0">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="text-left flex items-center gap-2">
                  <img src="/logo.png" alt="Ammamma Foods Logo" className="h-10 w-auto" />
                  <span className="text-lg font-black text-primary">AMMAMMA FOODS</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col py-2">
                {navLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="px-6 py-3 text-foreground font-semibold text-sm hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/50"
                  >
                    {item.label}
                  </Link>
                ))}
                {/* Auth links in mobile menu */}
                {user ? (
                  <>
                    <div className="px-6 py-3 border-b border-border/50">
                      <p className="font-semibold text-foreground text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 text-left text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="px-6 py-3 text-primary font-semibold text-sm hover:bg-primary/10 transition-colors">
                      Login
                    </Link>
                    <Link href="/signup" className="px-6 py-3 text-primary font-bold text-sm hover:bg-primary/10 transition-colors">
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Center: Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/15 transition-all duration-500 scale-[1.5] blur-sm" />
              <img
                src="/logo.png"
                alt="Ammamma Foods Logo"
                className="h-16 w-auto relative z-10 animate-logoEntrance transition-all duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110 drop-shadow-md"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-black text-primary tracking-tight">AMMAMMA FOODS</span>
            </div>
          </Link>

          {/* Right: Search + Cart */}
          <div className="flex items-center gap-2">
            <Link href="/#pantry-boxes" className="p-1.5 text-foreground" aria-label="Search products">
              <Search className="w-5 h-5" />
            </Link>
            <ShoppingCart
              items={cartItems}
              onRemove={onRemoveFromCart}
              onUpdateQuantity={onUpdateQuantity}
              onCheckout={onCheckout}
            />
          </div>
        </div>
      </div>

      {/* ===================== DESKTOP HEADER ===================== */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - large with professional animation */}
            <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-all duration-700 scale-[1.7] blur-lg" />
                {/* Spinning ring on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary/30 transition-all duration-700 scale-[1.35] group-hover:rotate-180" />
                <img
                  src="/logo.png"
                  alt="Ammamma Foods Logo"
                  className="h-[88px] w-auto relative z-10 animate-logoEntrance transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[360deg] group-hover:scale-[1.12] drop-shadow-md group-hover:drop-shadow-xl"
                />
              </div>
              <span className="text-3xl font-black text-primary tracking-tight leading-none">AMMAMMA FOODS</span>
            </Link>

            {/* Center Navigation */}
            <nav className="flex items-center gap-8">
              {navLinks.map((item, idx) =>
                item.label === 'PANTRY BOXES' ? (
                  <div
                    key={idx}
                    className="relative"
                    ref={pantryDropdownRef}
                    onMouseEnter={() => {
                      if (pantryTimeoutRef.current) clearTimeout(pantryTimeoutRef.current);
                      setShowPantryDropdown(true);
                    }}
                    onMouseLeave={() => {
                      pantryTimeoutRef.current = setTimeout(() => setShowPantryDropdown(false), 200);
                    }}
                  >
                    <Link
                      href={item.href}
                      className="text-foreground font-semibold text-sm hover:text-primary transition-colors relative group flex items-center gap-1"
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showPantryDropdown ? 'rotate-180' : ''}`} />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>

                    {/* Dropdown */}
                    {showPantryDropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                        <div className="bg-card rounded-xl shadow-2xl border border-border overflow-hidden min-w-[240px] animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="p-2">
                            {pantryBoxDropdownItems.map((box, bIdx) => (
                              <Link
                                key={bIdx}
                                href={box.href}
                                onClick={() => setShowPantryDropdown(false)}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors group/item"
                              >
                                <Package className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">
                                    {box.label}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{box.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-border bg-muted/50 px-4 py-2.5">
                            <Link
                              href="/#pantry-boxes"
                              onClick={() => setShowPantryDropdown(false)}
                              className="text-xs font-semibold text-primary hover:underline"
                            >
                              View all pantry boxes
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={idx}
                    href={item.href}
                    className="text-foreground font-semibold text-sm hover:text-primary transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>

              <ShoppingCart
                items={cartItems}
                onRemove={onRemoveFromCart}
                onUpdateQuantity={onUpdateQuantity}
                onCheckout={onCheckout}
              />

              {/* Auth Section */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
                  >
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                    <span className="font-semibold text-foreground text-sm">{user.name}</span>
                  </button>

                  {/* User Menu Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-xl border border-border z-50">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="font-semibold text-foreground text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs font-medium text-primary mt-1 uppercase">{user.role}</p>
                      </div>

                      <div className="p-2 space-y-1">
                        {user.role === 'user' && (
                          <Link
                            href="/user-dashboard"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium text-foreground"
                          >
                            <User className="w-4 h-4" />
                            My Dashboard
                          </Link>
                        )}
                        {user.role === 'owner' && (
                          <Link
                            href="/owner-dashboard"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium text-foreground"
                          >
                            <User className="w-4 h-4" />
                            Owner Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-primary font-bold px-4 py-2 rounded-lg hover:bg-primary/10 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    Sign Up
                    <span className="text-lg">{'→'}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
