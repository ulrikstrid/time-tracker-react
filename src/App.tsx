import * as React from 'react'
import './App.css'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import AddTime from './connectors/AddTime'
import NewProject from './connectors/NewProject'
import ProjectList from './connectors/ProjectList'

class App extends React.Component<{}, null> {
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='App-header'>
            <h2>Welcome to React</h2>
          </div>

          <Link to='/project'>Project list</Link>
          <Link to='/project/test/task/test'>Test project</Link>

          <Route path='/project' component={ProjectList} />
          <Route exact={true} path='/project/new' component={NewProject} />
          <Route exact={true} path='/project/:projectId/entry/:entryId' component={AddTime} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
