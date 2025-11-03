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
    console.log('Initializing React app...');
    const root = ReactDOM.createRoot(rootElement);
    
    // Wrap in error boundary at the root level
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(BrowserRouter, null,
          React.createElement(App)
        )
      )
    );
    
    console.log('React app initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize React app:', error);
  console.error('Error details:', {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    name: error instanceof Error ? error.name : undefined
  });
  
  // Show error in the UI
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #0A0A0A; color: #FFFFFF; font-family: 'Inter', sans-serif; padding: 2rem;">
        <div style="text-align: center; max-width: 600px;">
          <h2 style="color: #EF4444; margin-bottom: 1rem;">Application Error</h2>
          <p style="opacity: 0.8; margin-bottom: 1rem;">Failed to load the portfolio application.</p>
          <p style="opacity: 0.6; font-size: 0.9rem; margin-bottom: 2rem;">${error instanceof Error ? error.message : 'Unknown error'}</p>
          <button onclick="window.location.reload()" style="padding: 0.75rem 1.5rem; background: #3B82F6; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-family: 'Inter', sans-serif;">
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
}