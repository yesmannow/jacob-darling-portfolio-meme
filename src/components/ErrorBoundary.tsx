import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0A0A0A',
          color: '#FFFFFF',
          fontFamily: "'Inter', sans-serif",
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ color: '#EF4444', marginBottom: '1rem' }}>Something went wrong</h2>
            <p style={{ opacity: 0.8, marginBottom: '1rem' }}>
              The application encountered an error. Please refresh the page.
            </p>
            {this.state.error && (
              <details style={{ marginTop: '1rem', opacity: 0.6, fontSize: '0.9rem' }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>Error details</summary>
                <pre style={{ textAlign: 'left', overflow: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                  {this.state.error.message}
                  {this.state.error.stack && '\n\n' + this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                marginTop: '1rem'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
