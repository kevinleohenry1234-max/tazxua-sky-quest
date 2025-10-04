import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import removeConsole from "vite-plugin-removelog";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ['..']
    }
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && removeConsole()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.webp', '**/*.jpg', '**/*.png', '**/*.jpeg'],
  publicDir: 'public',
}));
