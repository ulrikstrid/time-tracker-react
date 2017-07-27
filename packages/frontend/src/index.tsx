import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";
import * as moment from "moment";
import "moment/locale/sv";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

import { AppState, initialState, appReducer, appEpic } from "./state/index";

moment().locale("sv");

const composeEnhancers = composeWithDevTools(
  {
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  }
);

const epicMiddleware = createEpicMiddleware(appEpic);

const store = createStore<AppState>(
  appReducer,
  initialState,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

store.dispatch({ type: "GET_TASKS" });
store.dispatch({ type: "GET_TIME_ENTRIES" });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
