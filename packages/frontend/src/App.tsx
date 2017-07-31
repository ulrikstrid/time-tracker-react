import * as React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import "./App.css";

import TimeFilter from "./connectors/TimeFilter";
import TimeList from "./connectors/TimeList";

class App extends React.Component<{}, {}> {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/tasks">Task list</Link>
          <Link to="/entries">Time entries</Link>

          <Route path="/" render={() => <TimeFilter />} />
          <Route exact={true} path="/" render={() => <TimeList />} />

          <Route exact={true} path="/entries" render={() => <TimeList />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
