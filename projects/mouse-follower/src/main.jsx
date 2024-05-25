import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  // TEORIA
  // .StricMode se utiliza solo para entornos de desarrollo ya que se utiliza 
  // para evaluar que todos los efectos se reseteen es decir que los efectos
  // esten realizando el CleanEffect
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
