import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          soft: "hsl(var(--primary-soft))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          soft: "hsl(var(--secondary-soft))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
          soft: "hsl(var(--tertiary-soft))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          soft: "hsl(var(--accent-soft))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Tây Bắc Cinematic Color Palette
        taybac: {
          forest: "#1D874F",      // Xanh rừng
          mist: "#93C7F0",        // Xanh lam sương
          sunset: "#EFD48B",      // Vàng nhạt hoàng hôn
          fog: "#F8FAFB",         // Trắng sương
          earth: "#8B7355",       // Nâu đất nhẹ
          "forest-light": "#22C55E",
          "forest-dark": "#166534",
          "mist-light": "#BFDBFE",
          "mist-dark": "#1E40AF",
          "sunset-light": "#FEF3C7",
          "sunset-dark": "#D97706",
          "fog-light": "#FFFFFF",
          "fog-dark": "#E5E7EB",
          "earth-light": "#A3A3A3",
          "earth-dark": "#525252",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fadeInUp": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "shimmer": {
          "0%": {
            transform: "translateX(-100%)"
          },
          "100%": {
            transform: "translateX(100%)"
          }
        },
        "shimmer-fast": {
          "0%": {
            transform: "translateX(-100%)"
          },
          "100%": {
            transform: "translateX(100%)"
          }
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "0.3"
          },
          "50%": {
            opacity: "0.6"
          }
        },
        "pulse-gentle": {
          "0%, 100%": {
            opacity: "0.8",
            transform: "scale(1)"
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)"
          }
        },
        "drift-right": {
          "0%": {
            transform: "translateX(-100%)"
          },
          "100%": {
            transform: "translateX(100vw)"
          }
        },
        "drift-left": {
          "0%": {
            transform: "translateX(100%)"
          },
          "100%": {
            transform: "translateX(-100vw)"
          }
        },
        "drift-right-slow": {
          "0%": {
            transform: "translateX(-100%)"
          },
          "100%": {
            transform: "translateX(100vw)"
          }
        },
        "float-particle-1": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px)",
            opacity: "0.4"
          },
          "25%": {
            transform: "translateY(-20px) translateX(10px)",
            opacity: "0.8"
          },
          "50%": {
            transform: "translateY(-10px) translateX(-5px)",
            opacity: "0.6"
          },
          "75%": {
            transform: "translateY(-30px) translateX(15px)",
            opacity: "0.9"
          }
        },
        "float-particle-2": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px)",
            opacity: "0.3"
          },
          "33%": {
            transform: "translateY(-15px) translateX(-8px)",
            opacity: "0.7"
          },
          "66%": {
            transform: "translateY(-25px) translateX(12px)",
            opacity: "0.5"
          }
        },
        "float-particle-3": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px)",
            opacity: "0.5"
          },
          "40%": {
            transform: "translateY(-18px) translateX(-12px)",
            opacity: "0.8"
          },
          "80%": {
            transform: "translateY(-8px) translateX(8px)",
            opacity: "0.6"
          }
        },
        "float-particle-4": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px)",
            opacity: "0.4"
          },
          "50%": {
            transform: "translateY(-22px) translateX(-6px)",
            opacity: "0.9"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fadeInUp": "fadeInUp 0.8s ease-out",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "shimmer-fast": "shimmer-fast 1.5s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "pulse-gentle": "pulse-gentle 3s ease-in-out infinite",
        "drift-right": "drift-right 80s linear infinite",
        "drift-left": "drift-left 70s linear infinite",
        "drift-right-slow": "drift-right-slow 120s linear infinite",
        "float-particle-1": "float-particle-1 8s ease-in-out infinite",
        "float-particle-2": "float-particle-2 10s ease-in-out infinite",
        "float-particle-3": "float-particle-3 12s ease-in-out infinite",
        "float-particle-4": "float-particle-4 9s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
