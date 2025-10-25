import React from 'react';
import { createRoot } from 'react-dom/client';

const TestApp = () => <div>Hello World</div>;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<TestApp />);
}
