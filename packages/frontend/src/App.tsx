import * as React from "react";
import {
  BrowserRouter,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";

import "./App.css";

import AddTime from "./connectors/AddTime";
import NewProject from "./connectors/NewProject";
import ProjectList from "./connectors/ProjectList";
import ViewProject from "./connectors/ViewProject";

fetch("/api/tasks").then(x => x.json()).then(x => console.log(x));

class App extends React.Component<{}, null> {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to React</h2>
          </div>

          <Link to="/project">Project list</Link>
          <Link to="/project/new">New project</Link>

          <Route exact={true} path="/" render={() => <ProjectList />} />
          <Route exact={true} path="/project" render={() => <ProjectList />} />
          <Route
            exact={true}
            path="/project/new"
            render={() => <NewProject />}
          />
          <Route
            exact={false}
            path="/project/:projectId"
            render={(routeProps: RouteComponentProps<{ projectId: string }>) =>
              <ViewProject projectId={routeProps.match.params.projectId} />}
          />
          <Route
            exact={true}
            path="/project/:projectId"
            render={(routeProps: RouteComponentProps<{ projectId: string }>) =>
              <AddTime projectId={routeProps.match.params.projectId} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
