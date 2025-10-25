import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

// Enhanced error suppression for TinyMCE and external script conflicts
const originalDefine = window.customElements?.define;
if (originalDefine) {
  window.customElements.define = function(name, constructor, options) {
    try {
      return originalDefine.call(this, name, constructor, options);
    } catch (error) {
      if (error.message && error.message.includes('has already been defined')) {
        console.warn(`Suppressed duplicate custom element: ${name}`);
        return constructor;
      }
      throw error;
    }
  };
}

// Comprehensive error handler for all custom element conflicts
window.addEventListener('error', (event) => {
  // Suppress TinyMCE and other custom element definition errors
  if (event.error && event.error.message &&
      (event.error.message.includes('has already been defined') ||
       event.error.message.includes('custom element') ||
       event.error.message.includes('define') ||
       event.error.message.includes('mce-autosize-textarea'))) {
    console.warn('Suppressed duplicate custom element definition:', event.error.message);
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections for custom elements
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message &&
      (event.reason.message.includes('has already been defined') ||
       event.reason.message.includes('custom element') ||
       event.reason.message.includes('mce-autosize-textarea'))) {
    console.warn('Suppressed duplicate custom element definition:', event.reason.message);
    event.preventDefault();
  }
});

// Handle runtime errors from external scripts
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && typeof event.reason === 'string' &&
      (event.reason.includes('has already been defined') ||
       event.reason.includes('custom element') ||
       event.reason.includes('mce-autosize-textarea'))) {
    console.warn('Suppressed external script error:', event.reason);
    event.preventDefault();
  }
});

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
  } else {
    ReactDOM.createRoot(rootElement).render(
      React.createElement(React.StrictMode, null,
        React.createElement(BrowserRouter, null,
          React.createElement(App)
        )
      )
    );
  }
} catch (error) {
  console.error('Failed to initialize React app:', error);
  // Fallback rendering
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif;">
      <div style="text-align: center; padding: 2rem; background: #f0f0f0; border-radius: 8px;">
        <h2>Portfolio Loading...</h2>
        <p>Please refresh the page or check the console for errors.</p>
        <p><strong>Available Routes:</strong></p>
        <ul style="text-align: left;">
          <li><a href="/">Home</a></li>
          <li><a href="/resume">Resume</a></li>
          <li><a href="/applications">Applications</a></li>
          <li><a href="/design">Design</a></li>
          <li><a href="/photography">Photography</a></li>
        </ul>
      </div>
    </div>
  `;
}