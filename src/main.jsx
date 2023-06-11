import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import App1 from './App1.jsx'
import App2 from './App2.jsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root1')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root1')
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>,
  document.getElementById('root')
)
ReactDOM.createRoot(document.getElementById('root2')).render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>,
  document.getElementById('root2')
)
