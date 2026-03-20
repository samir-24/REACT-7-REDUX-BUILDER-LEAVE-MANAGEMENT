// 1. Pehla React na imports
import React from 'react'
import ReactDOM from 'react-dom/client'

// 2. Pachhi Redux na imports
import { Provider } from 'react-redux'
import { store } from './app/store'

// 3. Pachhi tamara components
import Dashboard from './pages/Dashboard'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </React.StrictMode>,
)