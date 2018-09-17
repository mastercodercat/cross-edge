import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import 'antd/dist/antd.css'
import { ThemeProvider } from 'styled-components'

import 'polyfills/localStorage'
import { store, history } from 'store'
import Routes from 'routes'
import { getAuthToken } from 'utils/storage'
import themes from 'config/themes'
// import registerServiceWorker from './registerServiceWorker'

import './index.css'


/* Set up axios request interceptor for adding authorization header */

axios.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

/* Render app components */
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themes.themedefault}>
      <Routes history={history} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker()
