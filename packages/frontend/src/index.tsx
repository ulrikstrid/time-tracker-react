import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { AppState, initialState, appReducer } from './state/index'

const store = createStore<AppState>(appReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
