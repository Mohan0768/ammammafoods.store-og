'use client';

import { LayoutDashboard, Package, ShoppingCart, LogOut, Leaf } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <div className="w-64 bg-foreground text-card border-r border-card/20">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
          <Leaf className="w-5 h-5 text-primary" />
          <span>Admin Panel</span>
        </Link>
      </div>

      <nav className="px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-card'
                  : 'text-card/70 hover:text-card hover:bg-card/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-4">
        <Link href="/">
          <Button variant="outline" className="w-56 flex items-center gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Exit Admin
          </Button>
        </Link>
      </div>
    </div>
  );
}
