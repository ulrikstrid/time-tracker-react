import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppState, initialState, appReducer } from './state/index';

const store = createStore<AppState>(appReducer, initialState);

it('renders without crashing with a valid initial state', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , div);
});
