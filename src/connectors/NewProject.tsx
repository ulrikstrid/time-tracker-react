import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Project } from '../models/Project'
import { AppActions } from '../state'

import NewProject from '../components/NewProject'

import { NoOpAction } from '../state'
import { addProject } from '../state/actionCreators/projects'

interface DispatchProps {
  addProject: (project: Partial<Project>) => any
}

interface Props extends RouteComponentProps<{}>, DispatchProps {}

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

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch: Dispatch<AppActions>): DispatchProps {
  return {
    addProject: (project: Partial<Project>) => dispatch(addProject(project))
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
        addProject={this.props.addProject}
        projectName={this.state.projectName}
        projectDescription={this.state.projectDescription}
      />
    )
  }
}

export default withRouter(connect<{}, DispatchProps, RouteComponentProps<{}>>(mapStateToProps, mapDispatchToProps)(NewProjectConnector))
