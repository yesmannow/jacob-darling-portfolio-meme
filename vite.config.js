import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    // Compression plugins - generate gzip and brotli versions
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files > 1KB
      deleteOriginFile: false, // Keep original files
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    visualizer({
      open: false,
      filename: 'public/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
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
              "https://github.com/yesmannow",
              "https://bearcavemarketing.com",
              "https://www.facebook.com/jacob.darling.44227/",
              "https://www.tiktok.com/@jadarlin",
              "https://soundcloud.com/ottodarling",
              "https://www.youtube.com/@jacobthedarling"
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
    // Disable HMR overlay to prevent mce-autosize-textarea duplicate definition
    hmr: {
      overlay: false
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
    // Exclude heavy libraries from pre-bundling to prevent them from landing in main chunk
    exclude: ["@react-pdf/renderer"],
    esbuildOptions: {
      // Fix potential circular dependency issues
      keepNames: true,
    },
  },
  build: {
    rollupOptions: {
      // Enable aggressive tree-shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        // Prevent circular dependency warnings
        hoistTransitiveImports: false,
        // Ensure proper chunk loading in production
        format: 'es',
        manualChunks: (id) => {
          // Core React libraries - MUST be separate and load first
          // Include all React-related packages in vendor-react to prevent deduplication issues
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react/jsx-runtime') ||
              id.includes('node_modules/react/jsx-dev-runtime')) {
            return 'vendor-react';
          }

          // Three.js related (VERY LARGE - check EARLY before other vendors)
          // Must be isolated to prevent it from bloating the main index.mjs chunk
          // Check for all Three.js packages and dependencies
          if (id.includes('node_modules/three/') ||
              id.includes('node_modules/@react-three/') ||
              id.includes('node_modules/three/src/') ||
              id.includes('node_modules/three/build/')) {
            // Force Three.js into its own clean, separate chunk
            return 'three-vendor';
          }

          // Animation libraries (large, bundle together)
          if (id.includes('node_modules/framer-motion') ||
              id.includes('node_modules/gsap') ||
              id.includes('node_modules/lenis')) {
            return 'animation-vendor';
          }

          // Router libraries (depends on React)
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }

          // PDF libraries (large, lazy load these separately)
          // Must be isolated into vendor-pdf chunk to prevent main bundle bloat
          if (id.includes('node_modules/@react-pdf') ||
              id.includes('node_modules/@react-pdf/') ||
              id.includes('node_modules/jspdf')) {
            return 'vendor-pdf';
          }

          // UI libraries
          if (id.includes('node_modules/lucide-react')) {
            return 'ui-vendor';
          }

          if (id.includes('node_modules/@radix-ui')) {
            return 'ui-vendor';
          }

          // Charting libraries (recharts - REMOVED)
          // MarketingCommandCenter was removed, so recharts is no longer used
          // if (id.includes('node_modules/recharts') ||
          //     id.includes('node_modules/recharts/')) {
          //   return 'charts-vendor';
          // }

          // Particle systems (tsparticles - removed, not used)
          // if (id.includes('node_modules/tsparticles')) {
          //   return 'particles-vendor';
          // }

          // Image processing libraries (large)
          if (id.includes('node_modules/jimp') || id.includes('node_modules/node-vibrant')) {
            return 'image-vendor';
          }

          // Split large source files into logical chunks
          if (id.includes('/src/pdf/')) {
            return 'pdf-app';
          }

          // Explicitly split pages into separate chunks for code splitting
          // IMPORTANT: Check pages BEFORE node_modules to ensure proper splitting
          // This ensures React.lazy() imports create individual chunks
          if (id.includes('/src/pages/')) {
            // Case study detail pages (nested structure)
            if (id.includes('/src/pages/case-studies/')) {
              const caseStudyMatch = id.match(/\/src\/pages\/case-studies\/([^\/]+)\/index\.tsx?$/);
              if (caseStudyMatch) {
                return `page-case-study-${caseStudyMatch[1]}`;
              }
              // Handle any other case-study files
              return 'page-case-study-shared';
            }

            // Side project detail pages
            if (id.includes('/src/pages/side-projects/')) {
              if (id.includes('SideProjectDetail')) {
                return 'page-side-project-detail';
              }
              return 'page-side-project-shared';
            }

            // Main page files (top-level pages) - match without extension
            const pageMatch = id.match(/\/src\/pages\/([^\/]+)(?:\.tsx?)?$/);
            if (pageMatch) {
              const pageName = pageMatch[1];
              // Handle index.tsx as homepage
              if (pageName === 'index') {
                return 'page-home';
              }
              // All other top-level pages get their own chunk
              return `page-${pageName.toLowerCase()}`;
            }

            // If still a page file but no match, put in shared chunk
            return 'page-shared';
          }

          // Other node_modules (split remaining vendors by package)
          // This must come AFTER pages to ensure pages are split first
          if (id.includes('node_modules')) {
            // Split vendors by package name for better caching and parallel loading
            const match = id.match(/node_modules\/([^\/]+)/);
            if (match) {
              const pkg = match[1];
              // Large packages get their own chunk
              const largePackages = ['@react-pdf', 'three', 'framer-motion', 'gsap', 'lucide-react'];
              if (largePackages.some(largePkg => pkg.startsWith(largePkg))) {
                return `vendor-${pkg.replace('@', '').replace('/', '-')}`;
              }
              // Group smaller packages together
              return 'vendor-misc';
            }
            // Fallback
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
        pure_funcs: ['console.debug'], // Only drop debug, keep log/warn/error
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true,
        properties: false, // Keep property names for better debugging if needed
      },
      format: {
        comments: false, // Remove comments
      },
    },
    // Source maps disabled for production (reduces build size significantly)
    sourcemap: false,
    // Target modern browsers for better optimization (ES2020+)
    target: 'esnext',
    // CSS code splitting - each page gets its own CSS chunk
    cssCodeSplit: true,
    // Asset optimization
    assetsInlineLimit: 4096, // 4kb inline limit (small assets inlined as data URLs)
    chunkSizeWarningLimit: 500, // Warning at 500KB (more aggressive)
    // Report compressed sizes for bundle analysis
    reportCompressedSize: true,
    // Minify CSS aggressively
    cssMinify: true, // CSS minification enabled
  },
});