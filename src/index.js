import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import 'polyfills/localStorage'
import { store, history } from 'store'
import Routes from 'routes'
import { getAuthToken } from 'utils/storage'
// import registerServiceWorker from './registerServiceWorker'

import './index.css'


/* Set up axios request interceptor for adding authorization header */

axios.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers['Authorization'] = `JWT ${token}`
  }
  return config
})

/* Render app components */
ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker()
