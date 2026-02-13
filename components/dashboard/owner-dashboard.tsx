'use client';

import { useState, useMemo } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  Filter,
  Download,
  Search,
  Edit2,
  Eye,
} from 'lucide-react';
import type { Order } from '@/lib/dashboard-data';

interface OwnerDashboardProps {
  orders: Order[];
  analytics: {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
  };
}

export function OwnerDashboard({ orders, analytics }: OwnerDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'orders' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const stats = [
    {
      label: 'Total Orders',
      value: analytics.totalOrders,
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Revenue',
      value: `₹${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Avg Order Value',
      value: `₹${analytics.averageOrderValue}`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Pending Orders',
      value: analytics.ordersByStatus.pending,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 animate-fadeInDown">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Owner Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage orders, track analytics, and monitor business metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fadeInUp`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-border">
          {['overview', 'orders', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`px-6 py-3 font-semibold capitalize transition-all duration-300 border-b-2 ${
                selectedTab === tab
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Status Overview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 border-2 border-border animate-fadeInUp">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order Status Breakdown</h2>
                <div className="space-y-4">
                  {[
                    {
                      status: 'pending',
                      count: analytics.ordersByStatus.pending,
                      color: 'bg-yellow-500',
                    },
                    {
                      status: 'processing',
                      count: analytics.ordersByStatus.processing,
                      color: 'bg-blue-500',
                    },
                    {
                      status: 'shipped',
                      count: analytics.ordersByStatus.shipped,
                      color: 'bg-purple-500',
                    },
                    {
                      status: 'delivered',
                      count: analytics.ordersByStatus.delivered,
                      color: 'bg-green-500',
                    },
                    {
                      status: 'cancelled',
                      count: analytics.ordersByStatus.cancelled,
                      color: 'bg-red-500',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-foreground capitalize">{item.status}</span>
                        <span className="font-bold text-foreground">{item.count} orders</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${item.color} transition-all duration-500`}
                          style={{
                            width: `${(item.count / analytics.totalOrders) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-8 border-2 border-primary animate-slideInRight">
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Report
                </button>
                <button className="w-full bg-secondary hover:bg-secondary/90 text-foreground font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  <Edit2 className="w-5 h-5" />
                  Manage Products
                </button>
              </div>

              <div className="border-t-2 border-border mt-8 pt-8">
                <h3 className="font-bold text-foreground mb-4">Recent Alerts</h3>
                <div className="space-y-3">
                  {analytics.ordersByStatus.pending > 0 && (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-yellow-900 text-sm">Pending Orders</p>
                        <p className="text-yellow-700 text-xs">
                          {analytics.ordersByStatus.pending} orders waiting to be processed
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'orders' && (
          <div className="bg-white rounded-xl p-8 border-2 border-border animate-fadeInUp">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer, or Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Order ID</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Customer</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Amount</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => (
                    <tr
                      key={order.id}
                      className="border-b border-border hover:bg-gray-50 transition-colors animate-fadeInUp"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <td className="px-4 py-4 font-semibold text-foreground">{order.id}</td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-foreground">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-foreground">{order.orderDate}</td>
                      <td className="px-4 py-4 font-bold text-primary">₹{order.total}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(
                            order.status
                          )} capitalize`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 border-2 border-border animate-fadeInUp">
              <h2 className="text-2xl font-bold text-foreground mb-6">Revenue Metrics</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                  <p className="text-sm text-green-600 font-semibold">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-700">₹{analytics.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
                  <p className="text-sm text-blue-600 font-semibold">Average Order Value</p>
                  <p className="text-3xl font-bold text-blue-700">₹{analytics.averageOrderValue}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
                  <p className="text-sm text-purple-600 font-semibold">Total Orders</p>
                  <p className="text-3xl font-bold text-purple-700">{analytics.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border-2 border-border animate-slideInRight">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Distribution</h2>
              <div className="space-y-3">
                {[
                  { status: 'delivered', color: 'text-green-600', icon: CheckCircle },
                  { status: 'shipped', color: 'text-purple-600', icon: Truck },
                  { status: 'processing', color: 'text-blue-600', icon: Package },
                  { status: 'pending', color: 'text-yellow-600', icon: Clock },
                ].map((item) => {
                  const count = analytics.ordersByStatus[item.status];
                  const Icon = item.icon;
                  return (
                    <div key={item.status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-semibold text-foreground capitalize">{item.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{count}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{
                              width: `${(count / analytics.totalOrders) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeInUp">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto p-8 border-4 border-primary">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Order Details: {selectedOrder.id}</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold">Customer</p>
                    <p className="text-lg font-bold text-foreground">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-bold border-2 ${getStatusColor(
                        selectedOrder.status
                      )} capitalize`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-border pt-4">
                  <p className="text-sm text-muted-foreground font-semibold mb-3">Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="font-medium text-foreground">{item.name}</span>
                        <span className="text-muted-foreground">
                          {item.quantity}x ₹{item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t-2 border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
