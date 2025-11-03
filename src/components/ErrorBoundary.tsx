import React from 'react';
import styles from './ErrorBoundary.module.css';

type State = {
  hasError: boolean;
  error?: Error | null;
};

export class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // You can log error to an external service here
    // console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>Loading profile....</h1>
            <p className={styles.message}>Something went wrong while loading the profile. Try reloading the page.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
