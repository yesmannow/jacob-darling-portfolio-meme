// Ensure React loads first and is available globally
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

function hideLoadingScreen() {
  const loading = document.getElementById('loading-screen');
  if (loading) loading.style.display = 'none';
}

function showErrorScreen(message: string) {
  const loading = document.getElementById('loading-screen');
  if (loading) loading.innerHTML = `<div style="color:red;">⚠️ ${message}</div>`;
}

// Verify React is loaded before proceeding
if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
  throw new Error('React or ReactDOM failed to load. Check your build configuration.');
}

// Make React available globally IMMEDIATELY for any code that needs it (for third-party libs)
// This must happen before any chunks load to prevent "Cannot read properties of undefined (reading 'forwardRef')" errors
if (typeof window !== 'undefined') {
  // Set React on window immediately - chunks may load before this module fully executes
  // Replace any placeholder with the real React object
  (window as any).React = React;

  // Ensure React.forwardRef and all React APIs are available
  // Some libraries/chunks access React.forwardRef directly and need it immediately
  if (React && typeof React === 'object') {
    // Update the placeholder with full React object including forwardRef
    Object.assign((window as any).React, React);
  }
}

// Enhanced error suppression for TinyMCE and external script conflicts
// This must run IMMEDIATELY before any other scripts to catch early registrations
// Set up error suppression BEFORE any imports to catch early errors
if (typeof window !== 'undefined') {
  // Note: Removed aggressive error suppression
  // Vite 5.4.21 should have fixed HMR overlay issues

  // Custom element guard is now handled by index.html script for consistency
}


// Set a timeout to show error if React doesn't mount within 10 seconds
try {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  setTimeout(() => {
    hideLoadingScreen();
    console.log('✅ React app mounted');
  }, 100);

  setTimeout(() => {
    showErrorScreen("Something went wrong. Please refresh.");
    console.warn("⏳ React mount timeout triggered");
  }, 10000);
} catch (err) {
  showErrorScreen("App failed to load.");
  console.error("❌ React mount error:", err);
}


