import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')!

// When the page was prerendered at build time the #root div already has
// child nodes in the static HTML.  Use hydrateRoot so React attaches to
// the existing DOM (no flicker, no mismatch warnings) instead of wiping
// it out and re-rendering from scratch.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
