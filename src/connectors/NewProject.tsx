import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import NewProject from '../components/NewProject'

import { NoOpAction } from '../state'

interface Props extends RouteComponentProps<{}> {}

type State = {
  projectName: string | null,
  projectDescription: string | null
}

type SetName = {
  type: 'SET_PROJECT_NAME_STATE',
  payload: string
}

type SetDescription = {
  type: 'SET_PROJECT_DESCRIPTION_STATE',
  payload: string
}

type Actions = SetName | SetDescription | NoOpAction

function stateReducer (state: State, action: Actions): State {
  switch (action.type) {
    case 'SET_PROJECT_NAME_STATE':
      return {
        ...state,
        projectName: action.payload
      }

    case 'SET_PROJECT_DESCRIPTION_STATE':
      return {
        ...state,
        projectDescription: action.payload
      }

    default:
      return state
  }
}

function setProjectName (name: string): SetName {
  return {
    type: 'SET_PROJECT_NAME_STATE',
    payload: name
  }
}

function setProjectDescription (description: string): SetDescription {
  return {
    type: 'SET_PROJECT_DESCRIPTION_STATE',
    payload: description
  }
}

class NewProjectConnector extends React.PureComponent<Props, State> {
  state = stateReducer({
    projectName: null,
    projectDescription: null
  }, { type: 'NO_OP' })

  setProjectName = (name: string) => {
    this.setState((prevState) => {
      return stateReducer(prevState, setProjectName(name))
    })
  }

  setProjectDescription = (description: string) => {
    this.setState((prevState) => {
      return stateReducer(prevState, setProjectDescription(description))
    })
  }

  render () {
    return (
      <NewProject
        setProjectName={this.setProjectName}
        setProjectDescription={this.setProjectDescription}
        projectName={this.state.projectName}
        projectDescription={this.state.projectDescription}
      />
    )
  }
}

export default withRouter(NewProjectConnector)
