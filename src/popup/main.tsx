import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthCallback from './AuthCallback';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('root element not found');
}

let ComponentToRender = App;

if (rootElement.classList.contains('auth-callback')) {
  ComponentToRender = AuthCallback;
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ComponentToRender />
  </React.StrictMode>,
);
