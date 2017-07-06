import { connect } from 'react-redux'

import { AppState, getProject, getProjectTasks, getProjectTimeEntries } from '../state';
import ViewProject, { Props } from '../components/ViewProject'

interface OwnProps {
  projectId: string
}

function mapStateToProps (appState: AppState, ownProps: OwnProps): Props {
  return {
    project: getProject(appState, ownProps.projectId),
    tasks: getProjectTasks(appState, ownProps.projectId),
    timeEntries: getProjectTimeEntries(appState, ownProps.projectId)
  }
}

const ViewProjectConnector: React.ComponentClass<{ projectId: string }> = connect<Props, {} , OwnProps>(mapStateToProps)(ViewProject)
export default ViewProjectConnector
