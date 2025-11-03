import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    })
  ],
  server: {
    fs: {
      strict: false
    },
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "lenis", "framer-motion", "gsap"],
    exclude: ["@react-pdf/renderer"],
  },
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      output: {
        format: 'es',
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react/jsx-runtime')) {
            return 'react-vendor';
          }

          if (id.includes('node_modules/framer-motion') ||
              id.includes('node_modules/gsap') ||
              id.includes('node_modules/lenis')) {
            return 'animation-vendor';
          }

          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }

          if (id.includes('node_modules/@react-pdf')) {
            return 'pdf-vendor';
          }

          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
          }

          if (id.includes('node_modules/jimp') || id.includes('node_modules/node-vibrant')) {
            return 'image-vendor';
          }

          // App chunks
          if (id.includes('/src/pdf/')) {
            return 'pdf-app';
          }

          if (id.includes('/src/pages/')) {
            if (id.includes('/src/pages/case-studies/')) {
              return 'case-studies';
            }
            if (id.includes('/src/pages/side-projects/')) {
              return 'side-projects';
            }
            return 'pages';
          }

          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    minify: 'terser',
    target: 'es2015',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
    cssMinify: true,
  },
});