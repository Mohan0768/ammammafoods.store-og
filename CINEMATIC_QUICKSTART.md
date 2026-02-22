# Cinematic Experience - Quick Start Guide

## 🚀 Getting Started

### 1. Access the Experience
Navigate to `/cinematic` in your browser to see the cinematic landing page in action.

### 2. Features Overview

#### Hero Section
- **Fullscreen Experience**: Immersive entry point with animated particles
- **Text Animations**: Gradient text with fade-up and blur effects
- **Parallax Effect**: Title moves with scroll for depth perception
- **CTA Button**: Glowing button with scale animation on hover

#### World Section
- **Parallax Layers**: Four distinct layers reveal as you scroll
- **Staggered Text**: Each layer appears with slight delay
- **Responsive Design**: Adapts gracefully to all screen sizes

#### Gameplay Section
- **Horizontal Scroll**: Triggered by vertical scrolling
- **Interactive Cards**: Features hover glow and scale effects
- **Smooth Transitions**: GPU-accelerated animations

#### Token Section
- **Feature Cards**: Grid layout with staggered entrance
- **Live Statistics**: Animated counter displays
- **Responsive Grid**: Adapts from 1 to 3 columns

#### CTA Footer
- **Hero Typography**: Large, impactful heading
- **Dual CTAs**: Primary action and secondary option
- **Footer Links**: Navigation and social links

## 🎨 Customization

### Change Colors
Edit the Tailwind classes in component files:

```tsx
// In hero.tsx, change from:
from-purple-400 via-pink-400 to-purple-600

// To your desired colors:
from-cyan-400 via-blue-400 to-cyan-600
```

### Modify Content
Each component has easily editable text:

```tsx
// In hero.tsx
<h1>CUSTOM TITLE HERE</h1>
<p>Your custom description</p>

// In world-section.tsx
const layers = [
  { depth: 1, text: 'Your Layer 1' },
  // ...
];
```

### Adjust Animations
Change timing in any component:

```tsx
// Slower animation (increase duration)
gsap.to(element, {
  opacity: 1,
  duration: 2.0,  // was 1.2
});

// Faster animation (decrease duration)
gsap.to(element, {
  opacity: 1,
  duration: 0.6,  // was 1.2
});
```

### Particle Customization
Modify particle behavior in `particle-background.tsx`:

```tsx
// Change particle count
for (let i = 0; i < 150; i++) {  // was 100
  particlesRef.current.push(createParticle());
}

// Change particle color
ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;  // blue instead of purple
```

## 📱 Responsive Behavior

- **Mobile**: Single column layout, touch-friendly buttons
- **Tablet**: Two-column grids, optimized spacing
- **Desktop**: Full horizontal scroll effects, advanced animations

## ⚡ Performance Tips

1. **Reduce Particle Count**: For older devices, lower from 100 to 50
2. **Disable Parallax**: Remove `willChange: 'transform'` on slower devices
3. **Optimize Images**: Ensure background images are optimized
4. **Use CSS Over Canvas**: For simpler effects, use CSS instead of canvas

## 🔧 Troubleshooting

### Animations Stuttering
- Reduce particle count in `particle-background.tsx`
- Check browser GPU acceleration is enabled
- Disable browser extensions

### Scroll Not Smooth
- Verify Lenis is initialized in the page component
- Check for conflicting scroll listeners
- Clear browser cache

### Mobile Issues
- Test in Chrome DevTools device emulation
- Check touch event handling
- Verify viewport settings

## 🎯 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| Mobile Safari | 14+ | ✅ Full support |

## 📊 Performance Metrics

Target metrics to aim for:

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub and connect to Vercel
# Automatic deployments on every push
```

### Manual Deployment
```bash
npm run build
npm run start
```

## 📚 File Structure

```
app/cinematic/
├── page.tsx                 # Main cinematic route

components/cinematic/
├── index.ts                 # Component exports
├── hero.tsx                 # Hero section with particles
├── particle-background.tsx  # Canvas particle system
├── world-section.tsx        # Parallax storytelling
├── gameplay-section.tsx     # Horizontal scroll cards
├── token-section.tsx        # Features & statistics
└── cta-footer.tsx          # Final CTA section

hooks/
└── use-scroll-animation.ts # Reusable animation hooks

app/
└── globals.css             # Global styles & animations
```

## 🎬 Next Steps

1. **Customize Content**: Update text and colors to match your brand
2. **Add Your Branding**: Replace default colors and fonts
3. **Optimize Images**: Add background images and graphics
4. **Deploy**: Push to GitHub and deploy to Vercel
5. **Monitor**: Track performance with analytics

## 💡 Advanced Customizations

### Add 3D Background
```tsx
// In hero.tsx, import Three.js components
import { Canvas } from '@react-three/fiber';
// Add 3D dragon or custom model
```

### Custom Scroll Effects
```tsx
// In components, use custom animation hooks
const elementRef = useParallax(0.5);
const textRef = useTextReveal();
```

### Sound Effects
```tsx
// Add audio in sections
<audio autoPlay>
  <source src="/ambient-music.mp3" />
</audio>
```

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Review the CINEMATIC_EXPERIENCE.md documentation
3. Check GitHub issues for similar problems
4. Create a new issue with details

---

**Ready to create something amazing?** Customize this experience and deploy to wow your users!
