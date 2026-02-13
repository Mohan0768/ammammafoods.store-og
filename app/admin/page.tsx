'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, Package, ShoppingCart, Users } from 'lucide-react';
import { products } from '@/lib/products';

export default function AdminDashboard() {
  // Mock data - in a real app this would come from your database
  const totalOrders = 1245;
  const totalRevenue = 125430;
  const totalCustomers = 3421;
  const totalProducts = products.length;

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'text-primary',
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue}`,
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'text-secondary',
    },
  ];

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome to Ammamma Foods Admin Panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {[
                { id: '#ORD-001', customer: 'John Doe', amount: '₹1,299', status: 'Completed' },
                { id: '#ORD-002', customer: 'Jane Smith', amount: '₹899', status: 'Processing' },
                { id: '#ORD-003', customer: 'Mike Johnson', amount: '₹2,149', status: 'Shipped' },
                { id: '#ORD-004', customer: 'Sarah Williams', amount: '₹749', status: 'Completed' },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{order.amount}</p>
                    <p className={`text-xs font-medium ${
                      order.status === 'Completed' ? 'text-green-600' : 
                      order.status === 'Processing' ? 'text-yellow-600' : 
                      'text-blue-600'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Top Products</h2>
            <div className="space-y-4">
              {products.slice(0, 4).map((product, index) => (
                <div key={product.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">₹{product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">★ {product.rating}</p>
                    <p className="text-xs text-muted-foreground">{product.reviews} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
