import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthCallback from './AuthCallback'
import './index.css'

const rootElement = document.getElementById('root');
let ComponentToRender = App;
if (rootElement!.classList.contains('auth-callback')) {
  ComponentToRender = AuthCallback;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ComponentToRender />
  </React.StrictMode>
)
