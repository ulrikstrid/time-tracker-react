import * as React from "react";
import {
  BrowserRouter,
  Route,
  Link
  // RouteComponentProps
} from "react-router-dom";

import "./App.css";

// import AddTime from "./connectors/AddTime";
import ProjectList from "./connectors/ProjectList";
import TaskList from "./connectors/TaskList";
import TimeFilter from "./connectors/TimeFilter";
import TimeList from "./connectors/TimeList";

class App extends React.Component<{}, {}> {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/tasks">Task list</Link>
          <Link to="/entries">Time entries</Link>

          <Route exact={true} path="/" render={() => <ProjectList />} />

          <Route exact={true} path="/tasks" render={() => <TaskList />} />
          <Route path="/entries" render={() => <TimeFilter />} />
          <Route exact={true} path="/entries" render={() => <TimeList />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
