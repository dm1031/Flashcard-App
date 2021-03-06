import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './Components'
import { Provider } from 'react-redux'
import store from './store/store'

const root = document.querySelector('#root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)
