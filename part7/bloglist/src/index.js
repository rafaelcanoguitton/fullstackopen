import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './Router'
import './index.css'
import store from './reducers/store'
import { Provider } from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
)
