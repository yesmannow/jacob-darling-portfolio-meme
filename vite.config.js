import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Jacob Darling — Design. Motion. Code.',
          description: 'A cinematic portfolio by Jacob Darling — bridging creativity, technology, and storytelling.',
          ogTitle: 'Jacob Darling — Cinematic Portfolio',
          ogDescription: 'Explore Jacob’s cinematic digital work — where design, code, and motion move as one.',
          ogImage: '/images/og-cover.webp',
          ogUrl: 'https://jacobdarling.com',
          twitterCard: 'summary_large_image',
          twitterTitle: 'Jacob Darling — Cinematic Portfolio',
          twitterDescription: 'Design. Motion. Code. Cinematic storytelling for the modern web.',
          twitterImage: '/images/og-cover.webp',
          canonicalUrl: 'https://jacobdarling.com',
          ldJson: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jacob Darling",
            "jobTitle": "Creative Technologist",
            "url": "https://jacobdarling.com",
            "image": "/images/bio/bio-photo.jpg",
            "sameAs": [
              "https://linkedin.com/in/jacobdarling",
              "https://github.com/JdarlingGT"
            ]
          })
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["lenis", "react", "react-dom", "framer-motion", "gsap"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }

          // Animation libraries
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap')) {
            return 'animation-vendor';
          }

          // UI libraries
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/@radix-ui')) {
            return 'ui-vendor';
          }

          // PDF libraries (large)
          if (id.includes('node_modules/@react-pdf') || id.includes('node_modules/jspdf')) {
            return 'pdf-vendor';
          }

          // Router libraries
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }

          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      },
    },
    // Performance optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    // Source maps for production debugging
    sourcemap: false,
    // Target modern browsers for better optimization
    target: 'esnext',
    // CSS code splitting
    cssCodeSplit: true,
    // Asset optimization
    assetsInlineLimit: 4096, // 4kb inline limit
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB
  },
});