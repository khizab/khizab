import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Buffer } from 'buffer'
;(globalThis as any).Buffer = Buffer

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
