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
        manualChunks: {
          vendor: ["react", "react-dom", "framer-motion", "gsap"],
        },
      },
    },
  },
});