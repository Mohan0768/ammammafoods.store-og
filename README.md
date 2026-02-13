# 🌶️ Ammamma Foods - Premium Indian Spices E-Commerce Platform

A modern, production-ready e-commerce platform for premium Indian masala blends with beautiful animations, comprehensive dashboards, and seamless user experience.

## 🎯 Features

### 🛍️ Customer Features
- **Product Catalog**: 8 premium masala blends with detailed descriptions
- **Combo Boxes**: ₹999 special offers (Bachelor, Family, NRI boxes)
- **Custom Box Builder**: Create personalized ₹999 combinations
- **Shopping Cart**: Full cart management with persistent storage
- **Checkout**: Streamlined checkout process
- **Order Tracking**: User dashboard with order history
- **Subscription Plans**: 3-month and 6-month subscription options
- **Glare Hover Effects**: Interactive product images with premium animations

### 👨‍💼 Owner/Admin Features
- **Analytics Dashboard**: Revenue, orders, and customer metrics
- **Order Management**: View, filter, and update order status
- **Customer Insights**: Detailed customer information
- **Real-time Updates**: Live order status tracking

### 🎨 Design Features
- **Premium Aesthetic**: Warm color palette reflecting Indian heritage
- **Smooth Animations**: Glare hover effects on all product images
- **Responsive Design**: Mobile-first approach, works on all devices
- **Professional UI**: Clean, modern interface with excellent UX
- **Dark Mode Ready**: Compatible with system preferences

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks + Local Storage
- **TypeScript**: Full type safety
- **Animations**: CSS-based animations + GlareHover component

## 📁 Project Structure

```
ammamma-foods/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Signup page
│   ├── checkout/page.tsx        # Checkout page
│   ├── subscription/page.tsx    # Subscription plans
│   ├── custom-box/page.tsx      # Custom combo builder
│   ├── user-dashboard/          # User dashboard
│   ├── owner-dashboard/         # Admin dashboard
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── glare-hover.tsx          # Premium glare effect component
│   ├── header.tsx               # Navigation header
│   ├── footer.tsx               # Site footer
│   ├── hero.tsx                 # Hero section
│   ├── product-card.tsx         # Product card with glare
│   ├── combo-boxes-section.tsx  # Combo boxes showcase
│   ├── services-section.tsx     # Services with circular effects
│   ├── blog-section.tsx         # Blog/news articles
│   ├── testimonials-section.tsx # Customer testimonials
│   ├── dashboard/               # Dashboard components
│   └── ui/                      # shadcn/ui components
├── hooks/                        # Custom React hooks
│   ├── use-cart.ts              # Cart state management
│   ├── use-auth.ts              # Authentication state
│   └── use-currency.ts          # Currency conversion
├── lib/                         # Utilities and constants
│   ├── products.ts              # Product data
│   ├── dashboard-data.ts        # Mock dashboard data
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
│   ├── products/                # Product images
│   └── dashboard-illustration.jpg
└── styles/
    └── globals.css              # Global styles & animations
```

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ammamma-foods.git

# Navigate to project
cd ammamma-foods

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📦 Key Components

### GlareHover Component
Premium glare/shine effect on images with customizable parameters:
- Glare color, opacity, and angle
- Smooth animations with configurable duration
- Works on product cards, combo boxes, and blog images

### Shopping Cart Hook
Persistent cart management with:
- Add/remove products
- Update quantities
- Currency conversion
- Local storage persistence

### Authentication System
Role-based authentication with:
- Email/password login
- Google OAuth ready
- Customer and Owner roles
- Session persistence

### Dashboard Analytics
Owner dashboard features:
- Revenue metrics
- Order analytics
- Customer insights
- Real-time order tracking

## 🎨 Color Palette

- **Primary**: `#2E8B6F` (Deep Green)
- **Secondary**: `#F4D35E` (Golden Yellow)
- **Background**: `#F5F5F5` (Light Gray)
- **Foreground**: `#1A1A1A` (Dark Text)
- **Accent**: `#C85A3A` (Rust Red)

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Security Features

- ✅ No exposed API keys
- ✅ Input validation on forms
- ✅ Secure session management
- ✅ HTTPS ready
- ✅ SQL injection prevention ready

## 📊 Performance Optimizations

- ✅ Image optimization (lazy loading)
- ✅ CSS-based animations (no heavy JS)
- ✅ Component-level code splitting
- ✅ Efficient state management
- ✅ Responsive design (mobile-first)

## 🔄 Update Logs

### v1.0.0 - Initial Release
- Complete homepage with all sections
- Glare hover effects on all product images
- User and owner dashboards
- Authentication system
- Product catalog and combo boxes
- Shopping and checkout flow
- Animations and interactions

## 📖 Usage Examples

### Adding a New Product

```typescript
// In lib/products.ts
export const products = [
  // ... existing products
  {
    id: '9',
    name: 'New Masala',
    description: 'Description here',
    price: 299,
    category: 'Masalas',
    image: '/products/new-masala.jpg',
    rating: 4.8,
    reviews: 150,
  },
];
```

### Customizing Glare Effect

```tsx
<GlareHover
  glareColor="#ffffff"
  glareOpacity={0.3}
  glareAngle={-45}
  glareSize={300}
  transitionDuration={800}
>
  {/* Content */}
</GlareHover>
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For support, email: support@ammammafoods.store

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for food lovers worldwide**
