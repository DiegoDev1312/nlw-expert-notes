import React from 'react'
import { Toaster } from 'sonner'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
      <Toaster position='top-right' richColors />
  </React.StrictMode>,
)
