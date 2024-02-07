import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CompositeProvider from './context/CompositeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CompositeProvider>
      <App />
    </CompositeProvider>
  </React.StrictMode>
);