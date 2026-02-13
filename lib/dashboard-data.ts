export interface Order {
  id: string;
  customerName: string;
  email: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  address: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Priya Sharma',
    email: 'priya@example.com',
    orderDate: '2024-02-03',
    status: 'delivered',
    total: 1299,
    items: [
      { id: '1', name: 'Garam Masala', quantity: 2, price: 399 },
      { id: '2', name: 'Chaat Masala', quantity: 1, price: 349 },
    ],
    address: '123 MG Road, Bangalore',
  },
  {
    id: 'ORD-002',
    customerName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    orderDate: '2024-02-04',
    status: 'shipped',
    total: 2499,
    items: [
      { id: '3', name: 'Biryani Masala', quantity: 3, price: 449 },
      { id: '4', name: 'Sambar Powder', quantity: 2, price: 299 },
    ],
    address: '456 Church Street, Bangalore',
  },
  {
    id: 'ORD-003',
    customerName: 'Anjali Patel',
    email: 'anjali@example.com',
    orderDate: '2024-02-02',
    status: 'processing',
    total: 999,
    items: [
      { id: '5', name: 'Tandoori Masala', quantity: 1, price: 399 },
      { id: '6', name: 'Panch Phoron', quantity: 2, price: 299 },
    ],
    address: '789 Whitefield, Bangalore',
  },
  {
    id: 'ORD-004',
    customerName: 'Vikram Singh',
    email: 'vikram@example.com',
    orderDate: '2024-02-01',
    status: 'pending',
    total: 1799,
    items: [
      { id: '7', name: 'Curry Powder', quantity: 4, price: 299 },
      { id: '8', name: 'Rasam Powder', quantity: 1, price: 349 },
    ],
    address: '321 Indiranagar, Bangalore',
  },
  {
    id: 'ORD-005',
    customerName: 'Neha Gupta',
    email: 'neha@example.com',
    orderDate: '2024-01-31',
    status: 'cancelled',
    total: 849,
    items: [
      { id: '9', name: 'Garam Masala', quantity: 1, price: 399 },
      { id: '10', name: 'Chaat Masala', quantity: 1, price: 349 },
    ],
    address: '555 Koramangala, Bangalore',
  },
];

export const analytics = {
  totalOrders: mockOrders.length,
  totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
  averageOrderValue: Math.round(
    mockOrders.reduce((sum, order) => sum + order.total, 0) / mockOrders.length
  ),
  ordersByStatus: {
    pending: mockOrders.filter((o) => o.status === 'pending').length,
    processing: mockOrders.filter((o) => o.status === 'processing').length,
    shipped: mockOrders.filter((o) => o.status === 'shipped').length,
    delivered: mockOrders.filter((o) => o.status === 'delivered').length,
    cancelled: mockOrders.filter((o) => o.status === 'cancelled').length,
  },
};
