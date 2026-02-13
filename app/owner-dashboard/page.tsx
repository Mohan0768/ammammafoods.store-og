'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { OwnerDashboard } from '@/components/dashboard/owner-dashboard';
import { mockOrders, analytics } from '@/lib/dashboard-data';
import type { Order } from '@/lib/dashboard-data';

export default function OwnerDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [dashboardAnalytics, setDashboardAnalytics] = useState(analytics);
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
        <OwnerDashboard orders={orders} analytics={dashboardAnalytics} />
      </main>
      <Footer />
    </div>
  );
}
