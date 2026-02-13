'use client';

import { BarChart3, TrendingUp, Package, Clock, Eye, Settings } from 'lucide-react';
import Link from 'next/link';

export function DashboardFeatures() {
  const userFeatures = [
    {
      icon: Package,
      title: 'Track Orders',
      description: 'Real-time tracking of your spice orders from checkout to delivery',
    },
    {
      icon: Clock,
      title: 'Order History',
      description: 'View all your past orders, details, and reorder favorite masalas',
    },
    {
      icon: TrendingUp,
      title: 'Savings',
      description: 'Monitor your spending patterns and find exclusive deals',
    },
  ];

  const ownerFeatures = [
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive sales metrics and revenue analysis at a glance',
    },
    {
      icon: Eye,
      title: 'Order Management',
      description: 'Review, filter, and manage all customer orders efficiently',
    },
    {
      icon: Settings,
      title: 'Business Insights',
      description: 'Track order status breakdown and customer patterns',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">Dashboard Features</p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Smart Management <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Separate dashboards designed for customers and business owners to manage orders and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Customer Dashboard */}
          <div className="animate-slideInLeft">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Customer Dashboard</h3>
              </div>

              <div className="space-y-4 mb-8">
                {userFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="flex gap-3 animate-fadeInUp"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/user-dashboard"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-center block"
              >
                Go to Customer Dashboard
              </Link>
            </div>
          </div>

          {/* Owner Dashboard */}
          <div className="animate-slideInRight">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Owner Dashboard</h3>
              </div>

              <div className="space-y-4 mb-8">
                {ownerFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="flex gap-3 animate-fadeInUp"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/owner-dashboard"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 text-center block"
              >
                Go to Owner Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
