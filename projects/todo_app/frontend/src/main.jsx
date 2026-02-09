import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProviderFuncComp } from './context.jsx'

createRoot(document.getElementById('root')).render(
  <DataProviderFuncComp>
    <App />
  </DataProviderFuncComp>,
)
