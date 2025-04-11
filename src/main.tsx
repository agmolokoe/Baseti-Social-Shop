
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Configure error tracking
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error || event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Make sure DOM is ready before mounting
document.addEventListener('DOMContentLoaded', () => {
  // Make sure the root element exists
  const container = document.getElementById('root')
  if (!container) {
    throw new Error('Failed to find the root element')
  }
  
  const root = createRoot(container)
  
  // Use error boundary for more resilient rendering
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
});
