import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Project } from '../models/Project'

import { AppState, AppActions, getProjects } from '../state/index'
import { addProject, removeProject } from '../state/actionCreators/projects'

import ProjectList from '../components/ProjectList'

interface Props extends RouteComponentProps<{ entryId: string, projectId: string }> {}

function mapStateToProps (appState: AppState, props: Props) {
  return {
    projects: getProjects(appState),
    ...props
  }
}

function mapDispatchToProps (dispatch: Dispatch<AppActions>) {
  return {
    addProject: (project: Partial<Project>) => dispatch(addProject(project)),
    removeProject: (id: string) => dispatch(removeProject(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectList))
