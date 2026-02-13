'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: 1299,
    status: 'delivered',
    date: '2024-01-15',
    items: 3,
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    amount: 899,
    status: 'shipped',
    date: '2024-01-14',
    items: 2,
  },
  {
    id: '#ORD-003',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    amount: 2149,
    status: 'processing',
    date: '2024-01-13',
    items: 5,
  },
  {
    id: '#ORD-004',
    customer: 'Sarah Williams',
    email: 'sarah@example.com',
    amount: 749,
    status: 'pending',
    date: '2024-01-12',
    items: 1,
  },
  {
    id: '#ORD-005',
    customer: 'Robert Brown',
    email: 'robert@example.com',
    amount: 1599,
    status: 'delivered',
    date: '2024-01-11',
    items: 4,
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
    };
    return colors[status];
  };

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage customer orders</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by order ID, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <Card>
            <div className="w-full">
              <table className="w-full">
                <thead className="bg-secondary/10 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Order ID</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Customer</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Amount</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Items</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-secondary/5">
                      <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">₹{order.amount}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.items}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as Order['status'])
                          }
                          className="px-3 py-1 border border-border rounded text-sm bg-card text-foreground"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: orders.length, color: 'text-primary' },
            { label: 'Pending', value: orders.filter((o) => o.status === 'pending').length, color: 'text-yellow-600' },
            { label: 'Shipped', value: orders.filter((o) => o.status === 'shipped').length, color: 'text-purple-600' },
            { label: 'Delivered', value: orders.filter((o) => o.status === 'delivered').length, color: 'text-green-600' },
          ].map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
