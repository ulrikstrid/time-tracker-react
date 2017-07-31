import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { AppState, initialState, appReducer } from "./state/index";

import moment from "moment";
import "moment/locale/sv";
import momentLocalizer from "react-widgets/lib/localizers/moment";

moment().locale("sv");
momentLocalizer(moment);

const store = createStore<AppState>(appReducer, initialState);

it("renders without crashing with a valid initial state", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
