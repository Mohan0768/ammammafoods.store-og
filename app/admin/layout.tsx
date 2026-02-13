import React from "react"
import type { Metadata } from 'next';
import { AdminNav } from '@/components/admin-nav';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Ammamma Foods',
  description: 'Manage products and orders',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
