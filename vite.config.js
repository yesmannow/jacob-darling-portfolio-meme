import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react()
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
      "react": path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "lenis", "framer-motion", "gsap"],
    exclude: ["@react-pdf/renderer"],
    esbuildOptions: {
      keepNames: true,
    },
  },
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        hoistTransitiveImports: false,
        format: 'es',
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react/jsx-runtime') ||
              id.includes('node_modules/react/jsx-dev-runtime')) {
            return 'vendor-react';
          }

          if (id.includes('node_modules/framer-motion') ||
              id.includes('node_modules/gsap') ||
              id.includes('node_modules/lenis')) {
            return 'animation-vendor';
          }

          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }

          if (id.includes('node_modules/@react-pdf') ||
              id.includes('node_modules/@react-pdf/') ||
              id.includes('node_modules/jspdf')) {
            return 'vendor-pdf';
          }

          if (id.includes('node_modules/lucide-react')) {
            return 'ui-vendor';
          }

          if (id.includes('node_modules/jimp') || id.includes('node_modules/node-vibrant')) {
            return 'image-vendor';
          }

          if (id.includes('/src/pdf/')) {
            return 'pdf-app';
          }

          if (id.includes('/src/pages/')) {
            if (id.includes('/src/pages/case-studies/')) {
              const caseStudyMatch = id.match(/\/src\/pages\/case-studies\/([^\/]+)\/index\.tsx?$/);
              if (caseStudyMatch) {
                return `page-case-study-${caseStudyMatch[1]}`;
              }
              return 'page-case-study-shared';
            }

            if (id.includes('/src/pages/side-projects/')) {
              if (id.includes('SideProjectDetail')) {
                return 'page-side-project-detail';
              }
              return 'page-side-project-shared';
            }

            const pageMatch = id.match(/\/src\/pages\/([^\/]+)(?:\.tsx?)?$/);
            if (pageMatch) {
              const pageName = pageMatch[1];
              if (pageName === 'index') {
                return 'page-home';
              }
              return `page-${pageName.toLowerCase()}`;
            }

            return 'page-shared';
          }

          if (id.includes('node_modules')) {
            const match = id.match(/node_modules\/([^\/]+)/);
            if (match) {
              const pkg = match[1];
              const largePackages = ['@react-pdf', 'framer-motion', 'gsap', 'lucide-react'];
              if (largePackages.some(largePkg => pkg.startsWith(largePkg))) {
                return `vendor-${pkg.replace('@', '').replace('/', '-')}`;
              }
              return 'vendor-misc';
            }
            return 'vendor';
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          const baseName = facadeModuleId.replace(/\.(tsx|ts)$/, '');
          return `assets/${baseName}-[hash].js`;
        },
        entryFileNames: (chunkInfo) => {
          let name = chunkInfo.name || 'index';
          name = name.replace(/\.(tsx|ts)$/, '');
          if (!name || name === 'main') {
            name = 'index';
          }
          return `assets/${name}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];

          if (/\.(tsx|ts)$/.test(assetInfo.name)) {
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
        properties: false,
      },
      format: {
        comments: false,
      },
    },
    sourcemap: false,
    target: 'esnext',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    reportCompressedSize: true,
    cssMinify: true,
  },
});