'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { UserDashboard } from '@/components/dashboard/user-dashboard';
import { mockOrders } from '@/lib/dashboard-data';
import type { Order } from '@/lib/dashboard-data';

export default function UserDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartItems={[]} onRemoveFromCart={() => {}} onUpdateQuantity={() => {}} onCheckout={() => {}} />
      <main className="flex-1">
        <UserDashboard orders={orders} />
      </main>
      <Footer />
    </div>
  );
}
