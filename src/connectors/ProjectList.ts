import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom';

import { Project } from '../models/Project'

import { AppState, AppActions, getProjects } from '../state/index'
import { removeProject, RemoveProject } from '../state/actionCreators/projects'
import ProjectList from '../components/ProjectList'

interface OwnProps extends RouteComponentProps<{}> {}

interface StateToProps extends OwnProps {
  projects: Project[]
}

interface DispatchToProps {
  removeProject: (id: string) => RemoveProject
}

function mapStateToProps (appState: AppState, ownProps: OwnProps): StateToProps {
  return {
    projects: getProjects(appState),
    ...ownProps
  }
}

function mapDispatchToProps (dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    removeProject: (id: string) => dispatch(removeProject(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)
