import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FavouriteProvider from './Context/FavouriteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavouriteProvider>
     <App />
    </FavouriteProvider>
  </StrictMode>,
)
