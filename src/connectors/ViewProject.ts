import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import {
  AppState,
  getProject,
  getProjectTasks
} from '../state/index'
import ViewProject from '../components/ViewProject'

type Match = {
  projectId: string
}

interface OwnProps extends RouteComponentProps<Match> {}

function mapStateToProps (appState: AppState, ownProps: OwnProps) {
  return {
    project: getProject(appState, ownProps.match.params.projectId),
    tasks: getProjectTasks(appState, ownProps.match.params.projectId),
    timeEntries: [],
    ...ownProps
  }
}

export default connect(mapStateToProps)(ViewProject)
