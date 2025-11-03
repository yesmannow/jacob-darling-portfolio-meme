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
  },
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      output: {
        format: 'es',
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