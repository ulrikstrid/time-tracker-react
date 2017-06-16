import { addEntry, removeEntry } from '../state/actionCreators/entries'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import { AppState, AppActions, getTimeEntries } from '../state/index'

import { AddTime } from '../components/AddTime'

interface Props extends RouteComponentProps<{ entryId: string, projectId: string }> {}

function mapStateToProps (appState: AppState, props: Props) {
  return {
    timeEntries: getTimeEntries(appState),
    ...props
  }
}

function mapDispatchToProps (dispatch: Dispatch<AppActions>) {
  return {
    addTimeEntry: (taskId: string, from: Date, to: Date) => dispatch(addEntry(taskId, { from, to })),
    removeTimeEntry: (id: string) => dispatch(removeEntry(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTime)
