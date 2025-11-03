// Ensure React loads first and is available globally
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

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
  // Suppress custom element errors globally
  window.addEventListener('error', (event) => {
    if (event.error?.message?.includes('has already been defined') ||
        event.error?.message?.includes('mce-autosize-textarea')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true); // Use capture phase to catch early

  // Override customElements.define to prevent duplicates
  // This implements the exact pattern suggested: check !customElements.get() before defining
  const originalDefine = window.customElements?.define;
  if (originalDefine) {
    window.customElements.define = function(name, constructor, options) {
      // Explicit check: if element is already defined, don't redefine it
      // This is the recommended pattern: !customElements.get(name) before define()
      if (customElements.get(name)) {
        // Element already exists - silently return (prevents duplicate definition error)
        return;
      }

      // For mce-autosize-textarea specifically, add extra protection
      if (name === 'mce-autosize-textarea' && customElements.get('mce-autosize-textarea')) {
        return; // Already defined, skip
      }

      try {
        return originalDefine.call(this, name, constructor, options);
      } catch (error) {
        // If definition still fails (race condition), catch the error
        if (error && (error.message?.includes('has already been defined') ||
                      error.message?.includes('custom element') ||
                      name?.includes('mce-'))) {
          // Silently ignore duplicate registrations, especially TinyMCE elements
          return undefined;
        }
        throw error;
      }
    };
  }
}

// Comprehensive error handler for all custom element conflicts
// Also handle undefined errors and React forwardRef errors
window.addEventListener('error', (event) => {
  const filename = event.filename || '';
  const errorMessage = event.error?.message || event.message || '';

  // Handle React forwardRef errors (chunk loading before React is ready)
  if (errorMessage.includes("Cannot read properties of undefined (reading 'forwardRef')") ||
      errorMessage.includes('forwardRef') && errorMessage.includes('undefined')) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('React forwardRef accessed before React loaded - chunk timing issue:', {
        filename,
        message: errorMessage
      });
    }
    event.preventDefault();
    return false;
  }

  // Handle cases where error object is undefined
  if (!event.error && event.message && event.message.includes('undefined')) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Caught undefined error - preventing crash:', {
        message: event.message,
        filename,
        lineno: event.lineno,
        colno: event.colno
      });
    }
    event.preventDefault();
    return false;
  }

  // Suppress TinyMCE and other custom element definition errors
  // Also check filename to catch overlay_bundle.js errors
  if ((event.error && event.error.message &&
      (event.error.message.includes('has already been defined') ||
       event.error.message.includes('custom element') ||
       event.error.message.includes('define') ||
       event.error.message.includes('mce-autosize-textarea'))) ||
      filename.includes('overlay_bundle') ||
      filename.includes('webcomponents-ce')) {
    // Suppress custom element errors, especially from Vite overlay
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections for custom elements
// Also catch undefined rejections to prevent "Uncaught undefined" errors
window.addEventListener('unhandledrejection', (event) => {
  // Handle undefined rejections (common cause of "Uncaught undefined")
  if (event.reason === undefined || event.reason === null) {
    // Log for debugging but prevent console error (dev only)
    if (process.env.NODE_ENV === 'development') {
      console.warn('Caught undefined promise rejection - likely from external library');
    }
    event.preventDefault();
    return;
  }

  // Handle custom element errors
  if (event.reason && event.reason.message &&
      (event.reason.message.includes('has already been defined') ||
       event.reason.message.includes('custom element') ||
       event.reason.message.includes('mce-autosize-textarea'))) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Suppressed duplicate custom element definition:', event.reason.message);
    }
    event.preventDefault();
    return;
  }

  // Handle string-based rejections
  if (event.reason && typeof event.reason === 'string' &&
      (event.reason.includes('has already been defined') ||
       event.reason.includes('custom element') ||
       event.reason.includes('mce-autosize-textarea'))) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Suppressed external script error:', event.reason);
    }
    event.preventDefault();
    return;
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
      if (process.env.NODE_ENV === 'development') {
        console.log('Initializing React app...');
        console.log('React version:', React.version);
        console.log('ReactDOM available:', !!ReactDOM);
      }

      const root = ReactDOM.createRoot(rootElement);

      // Verify React.createElement exists
      if (!React.createElement) {
        throw new Error('React.createElement is not available');
      }

      // Wrap in error boundary at the root level
      // Add React Router v7 future flags to suppress warnings and prepare for migration
      root.render(
        React.createElement(React.StrictMode, null,
          React.createElement(BrowserRouter, {
            future: {
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }
          },
            React.createElement(App)
          )
        )
      );

      // Clear timeout once React mounts
      setTimeout(() => {
        clearTimeout(mountTimeout);
        if (process.env.NODE_ENV === 'development') {
          console.log('React app initialized successfully');
        }
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