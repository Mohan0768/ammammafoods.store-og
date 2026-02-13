'use client';

import { useState } from 'react';
import { Package, Clock, CheckCircle, Truck, XCircle, ArrowRight } from 'lucide-react';
import type { Order } from '@/lib/dashboard-data';

interface UserDashboardProps {
  orders: Order[];
}

export function UserDashboard({ orders }: UserDashboardProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
      case 'processing':
        return 'bg-blue-50 border-blue-200';
      case 'shipped':
        return 'bg-purple-50 border-purple-200';
      case 'delivered':
        return 'bg-green-50 border-green-200';
      case 'cancelled':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 animate-fadeInDown">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-lg text-muted-foreground">Track and manage your Ammamma Foods orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-border">
                  <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              ) : (
                orders.map((order, idx) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`bg-white rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102 animate-fadeInUp ${
                      selectedOrder?.id === order.id
                        ? 'border-primary shadow-lg'
                        : 'border-transparent'
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-primary font-semibold">Order ID: {order.id}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground mt-1">{order.orderDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className={`rounded-lg p-4 mb-4 border-2 ${getStatusColor(order.status)}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                          <p className="text-2xl font-bold text-foreground">₹{order.total.toLocaleString()}</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item) => (
                        <span
                          key={item.id}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {item.name} ({item.quantity}x)
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div>
            {selectedOrder ? (
              <div className="bg-white rounded-xl p-6 border-2 border-primary sticky top-20 animate-slideInRight">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order Details</h2>

                {/* Status Timeline */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-muted-foreground uppercase mb-4">Status Timeline</p>
                  <div className="space-y-3">
                    {['pending', 'processing', 'shipped', 'delivered'].map((status, idx, arr) => (
                      <div key={status} className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                            ['pending', 'processing', 'shipped', 'delivered'].indexOf(
                              selectedOrder.status
                            ) >= idx
                              ? 'bg-primary text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <p
                            className={`font-semibold capitalize ${
                              ['pending', 'processing', 'shipped', 'delivered'].indexOf(
                                selectedOrder.status
                              ) >= idx
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="border-t-2 border-border pt-6 mb-6">
                  <p className="text-sm font-semibold text-muted-foreground uppercase mb-4">Customer Info</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold text-foreground">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Delivery Address</p>
                      <p className="font-semibold text-foreground">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t-2 border-border pt-6">
                  <p className="text-sm font-semibold text-muted-foreground uppercase mb-4">Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-primary">₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
                    <p className="font-bold text-foreground">Total</p>
                    <p className="text-2xl font-bold text-primary">₹{selectedOrder.total}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 border-2 border-dashed border-border text-center sticky top-20">
                <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
