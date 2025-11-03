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
          ogDescription: 'Explore Jacob\'s cinematic digital work — where design, code, and motion move as one.',
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
  server: {
    fs: {
      strict: false
    },
    hmr: {
      overlay: false, // Disable overlay to let our error handlers manage errors
      clientPort: 5173
    },
    headers: {
      'Content-Type': 'text/javascript; charset=utf-8'
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react": path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "lenis", "framer-motion", "gsap"],
    esbuildOptions: {
      // Fix potential circular dependency issues
      keepNames: true,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Prevent circular dependency warnings
        hoistTransitiveImports: false,
        // Ensure proper chunk loading in production
        format: 'es',
        manualChunks: (id) => {
          // Core React libraries - MUST be separate and load first
          // Include all React-related packages in react-core to prevent deduplication issues
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react/jsx-runtime') ||
              id.includes('node_modules/react/jsx-dev-runtime')) {
            return 'react-core';
          }

          // Animation libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }

          if (id.includes('node_modules/gsap')) {
            return 'animation-vendor';
          }

          // Router libraries (depends on React)
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }

          // PDF libraries (large, lazy load these)
          if (id.includes('node_modules/@react-pdf') || id.includes('node_modules/jspdf')) {
            return 'pdf-vendor';
          }

          // Three.js related (large)
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'three-vendor';
          }

          // UI libraries
          if (id.includes('node_modules/lucide-react')) {
            return 'ui-vendor';
          }

          if (id.includes('node_modules/@radix-ui')) {
            return 'ui-vendor';
          }

          // Other large libraries
          if (id.includes('node_modules/recharts')) {
            return 'charts-vendor';
          }

          // Other node_modules (split more aggressively)
          if (id.includes('node_modules')) {
            // Prevent single huge vendor chunk
            return 'vendor';
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          // Remove .tsx/.ts extension and ensure .js extension
          const baseName = facadeModuleId.replace(/\.(tsx|ts)$/, '');
          return `assets/${baseName}-[hash].js`;
        },
        entryFileNames: (chunkInfo) => {
          // Ensure entry files always use .js extension, never .tsx
          let name = chunkInfo.name || 'index';
          // Remove any .tsx or .ts extension that might be in the name
          name = name.replace(/\.(tsx|ts)$/, '');
          // If no name or name is empty, use 'index'
          if (!name || name === 'main') {
            name = 'index';
          }
          return `assets/${name}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          // Prevent .tsx/.ts files from being copied as assets
          if (/\.(tsx|ts)$/.test(assetInfo.name)) {
            // These shouldn't be assets - they should be chunks
            // Return a JS extension to force proper handling
            const baseName = assetInfo.name.replace(/\.(tsx|ts)$/, '');
            return `assets/${baseName}-[hash].js`;
          }
          
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
        drop_console: false, // Keep console.log for production debugging
        drop_debugger: true,
        pure_funcs: ['console.debug'] // Only drop debug, keep log/warn/error
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