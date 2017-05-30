import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { AppState, AppActions, getProjects } from '../state/index'
import { removeProject } from '../state/actionCreators/projects'

import ProjectList from '../components/ProjectList'

interface Props extends RouteComponentProps<{}> {}

function mapStateToProps (appState: AppState, ownProps: Props) {
  return {
    projects: getProjects(appState),
    ...ownProps
  }
}

function mapDispatchToProps (dispatch: Dispatch<AppActions>) {
  return {
    removeProject: (id: string) => dispatch(removeProject(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectList))
