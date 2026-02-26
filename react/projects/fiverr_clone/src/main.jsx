import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DataProviderComponent from './context.jsx'

createRoot(document.getElementById('root')).render(
  <DataProviderComponent>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataProviderComponent>
)
