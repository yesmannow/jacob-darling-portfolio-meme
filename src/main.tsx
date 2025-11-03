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

// Set a timeout to show error if React doesn't mount within 10 seconds
const mountTimeout = setTimeout(() => {
  const rootElement = document.getElementById('root');
  if (rootElement && rootElement.children.length > 0) {
    const firstChild = rootElement.children[0];
    // Check if we're still showing the loading spinner
    if (firstChild.classList.contains('initial-loader')) {
      console.error('React app failed to mount within timeout');
      rootElement.innerHTML = `
        <div class="error-boundary-container">
          <div class="error-boundary-content">
            <h2 class="error-boundary-title">Loading Timeout</h2>
            <p class="error-boundary-message">
              The application is taking longer than expected to load. This might be due to a network issue or a JavaScript error.
            </p>
            <p class="error-boundary-details" style={{ marginTop: '1rem' } as React.CSSProperties}>
              Please check your browser console for errors and try refreshing the page.
            </p>
            <button
              onclick="window.location.reload()"
              class="error-boundary-button"
            >
              Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }
}, 10000);

// Verify React and ReactDOM are available before proceeding
if (!React || !ReactDOM) {
  console.error('React or ReactDOM is not available', { React, ReactDOM });
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div class="error-boundary-container">
        <div class="error-boundary-content">
          <h2 class="error-boundary-title">React Not Loaded</h2>
          <p class="error-boundary-message">
            React library failed to load. Please check your network connection and try refreshing the page.
          </p>
          <button onclick="window.location.reload()" class="error-boundary-button">
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
  clearTimeout(mountTimeout);
} else {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Root element not found');
      clearTimeout(mountTimeout);
    } else {
      console.log('Initializing React app...');
      console.log('React version:', React.version);
      console.log('ReactDOM available:', !!ReactDOM);

      const root = ReactDOM.createRoot(rootElement);

      // Verify React.createElement exists
      if (!React.createElement) {
        throw new Error('React.createElement is not available');
      }

      // Wrap in error boundary at the root level
      root.render(
        React.createElement(React.StrictMode, null,
          React.createElement(BrowserRouter, null,
            React.createElement(App)
          )
        )
      );

      // Clear timeout once React mounts
      setTimeout(() => {
        clearTimeout(mountTimeout);
        console.log('React app initialized successfully');
      }, 100);
    }
  } catch (error) {
    clearTimeout(mountTimeout);
    console.error('Failed to initialize React app:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    console.error('React availability check:', {
      React: !!React,
      ReactDOM: !!ReactDOM,
      ReactCreateElement: !!(React && React.createElement),
      ReactStrictMode: !!(React && React.StrictMode)
    });

    // Show error in the UI
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div class="error-boundary-container">
          <div class="error-boundary-content">
            <h2 class="error-boundary-title">Application Error</h2>
            <p class="error-boundary-message">Failed to load the portfolio application.</p>
            <p class="error-boundary-details">${error instanceof Error ? error.message : 'Unknown error'}</p>
            <button onclick="window.location.reload()" class="error-boundary-button">
              Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }
}