# Tà Xùa Sky Quest - Complete Frontend Code Documentation

## 🏗️ Project Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Hooks + Context
- **Routing**: React Router DOM
- **Backend**: Supabase (Authentication & Database)
- **Image Optimization**: Custom WebP converter
- **Performance**: React Query, Lazy Loading

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components (50+ components)
│   ├── Header.tsx       # Navigation header
│   ├── HeroSection.tsx  # Landing page hero
│   ├── ImageSlider.tsx  # Interactive image gallery
│   ├── LazyImage.tsx    # Optimized image loading
│   └── ...
├── pages/               # Route components
│   ├── Index.tsx        # Home page
│   ├── Accommodation.tsx # Homestay listings
│   ├── Attractions.tsx  # Tourist attractions
│   └── ...
├── lib/                 # Core utilities
│   ├── supabase.ts      # Backend integration
│   └── utils.ts         # Helper functions
├── utils/               # Utility functions
│   ├── imageOptimizer.ts
│   ├── performanceMonitor.ts
│   └── webpConverter.ts
└── assets/              # Static assets
```

## 🎨 Design System

### Color Palette (Tà Xùa Inspired)
```css
:root {
  /* Primary - Mountain mist blues */
  --primary: 210 40% 25%;           /* Deep mountain blue */
  --primary-foreground: 210 40% 98%;

  /* Secondary - Cloud whites */
  --secondary: 210 40% 96%;         /* Soft cloud white */
  --secondary-foreground: 210 40% 10%;

  /* Tertiary - Forest greens */
  --tertiary: 142 76% 36%;          /* Lush forest green */
  --tertiary-foreground: 355 100% 97%;

  /* Accent - Sunrise golds */
  --accent: 43 74% 66%;             /* Golden sunrise */
  --accent-foreground: 43 74% 10%;
}
```

### Typography
- **Primary Font**: Playfair Display (elegant serif)
- **Secondary Font**: Inter (modern sans-serif)

### Animations & Effects
- **Card Hover**: Subtle lift and shadow
- **Image Loading**: Shimmer effect
- **Scroll Reveal**: Staggered animations
- **Floating Elements**: Gentle movement
- **Gradient Shifts**: Dynamic backgrounds

## 🧩 Key Components

### 1. ImageSlider Component
```typescript
interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}
```
**Features:**
- Auto-play with pause on hover
- Navigation arrows and dots
- Image counter
- Responsive design
- Smooth transitions

### 2. LazyImage Component
```typescript
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onClick?: () => void;
  priority?: boolean;
  quality?: number;
}
```
**Features:**
- Intersection Observer for lazy loading
- WebP optimization
- Loading states with shimmer
- Error handling
- Performance tracking

### 3. Header Component
**Features:**
- Responsive navigation
- User authentication states
- Dropdown menus
- Mobile hamburger menu
- Smooth scrolling

### 4. HeroSection Component
**Features:**
- Auto-rotating background images
- Statistics display
- Call-to-action buttons
- Parallax effects
- Responsive design

## 📱 Pages Overview

### 1. Index.tsx (Home Page)
**Features:**
- Hero section with rotating images
- Category cards
- Explore section
- User authentication
- Dashboard integration

### 2. Accommodation.tsx
**Features:**
- Homestay listings with filters
- Interactive image galleries
- Booking modals
- Contact integration
- Responsive grid layout

### 3. Attractions.tsx
**Features:**
- Tourist attraction showcase
- Interactive maps
- Image galleries
- Detailed descriptions

## 🔧 Utility Functions

### Image Optimization
```typescript
// imageOptimizer.ts
export const getOptimizedImageUrl = async (src: string, options: OptimizationOptions) => {
  // WebP conversion and compression
};

export const preloadImage = (src: string) => {
  // Critical image preloading
};
```

### Performance Monitoring
```typescript
// performanceMonitor.ts
export const trackImageLoad = (src: string) => {
  // Performance metrics tracking
};
```

## 🎯 UI/UX Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid systems
- Touch-friendly interactions

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast ratios
- Focus indicators

### Performance Optimizations
- Lazy loading images
- Code splitting
- WebP image format
- Intersection Observer API
- React.memo for components
- Debounced search inputs

### Interactive Elements
- Hover effects on cards
- Smooth transitions
- Loading states
- Error boundaries
- Toast notifications
- Modal dialogs

## 🔐 Authentication System

### Supabase Integration
```typescript
// User registration
export const registerUser = async (userData: UserRegistration) => {
  // Supabase Auth + Profile creation
};

// User sign in
export const signInUser = async (email: string, password: string) => {
  // Authentication with error handling
};

// Google OAuth
export const signInWithGoogle = async () => {
  // Social authentication
};
```

### Features
- Email/password authentication
- Google OAuth integration
- User profiles
- Session management
- Demo account support

## 🎨 Custom Styling

### Tailwind Configuration
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Custom color palette
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
      },
    },
  },
}
```

### Custom CSS Classes
```css
/* Card animations */
.card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}

/* Button interactions */
.btn-primary {
  @apply bg-primary text-primary-foreground hover:bg-primary/90 
         transition-all duration-200 hover:scale-105;
}

/* Image loading effects */
.image-loading {
  @apply bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
         animate-pulse;
}
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "typescript": "^5.8.3"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.4.17",
  "@radix-ui/react-*": "Latest versions",
  "lucide-react": "^0.462.0",
  "class-variance-authority": "^0.7.1"
}
```

### Backend & Data
```json
{
  "@supabase/supabase-js": "^2.57.4",
  "@tanstack/react-query": "^5.83.0",
  "react-hook-form": "^7.61.1"
}
```

## 🚀 Build Configuration

### Vite Config
```typescript
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.webp', '**/*.jpg', '**/*.png'],
});
```

## 🎯 Key Features Implemented

### 1. Modern UI/UX
- ✅ Responsive design across all devices
- ✅ Smooth animations and transitions
- ✅ Interactive hover effects
- ✅ Loading states and error handling
- ✅ Accessible navigation

### 2. Performance Optimizations
- ✅ Lazy loading images
- ✅ WebP image optimization
- ✅ Code splitting
- ✅ Performance monitoring
- ✅ Efficient re-renders

### 3. User Experience
- ✅ Intuitive navigation
- ✅ Search and filtering
- ✅ Modal interactions
- ✅ Toast notifications
- ✅ Form validation

### 4. Content Management
- ✅ Dynamic image galleries
- ✅ Homestay listings
- ✅ Attraction showcases
- ✅ User profiles
- ✅ Booking system

## 📱 Mobile Responsiveness

### Breakpoint Strategy
- **Mobile**: < 640px - Single column, touch-optimized
- **Tablet**: 640px - 1024px - Two columns, hybrid interactions
- **Desktop**: > 1024px - Multi-column, hover effects

### Touch Interactions
- Swipe gestures for image galleries
- Touch-friendly button sizes (44px minimum)
- Optimized tap targets
- Smooth scrolling

## 🔍 SEO & Performance

### Optimization Techniques
- Semantic HTML structure
- Meta tags and descriptions
- Image alt attributes
- Lazy loading implementation
- Efficient bundle sizes
- Fast loading times

This comprehensive frontend codebase represents a modern, performant, and user-friendly web application built with the latest React ecosystem tools and best practices.