import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { Task } from '../models/Task'
import { TimeEntry, isTimeEntry } from '../models/TimeEntry'

import { AppState, AppActions, getProjectTasks } from '../state'
import { addEntry, AddEntry } from '../state/actionCreators/entries';

import { AddTime } from '../components/AddTime'

interface OwnProps {
  projectId: string
}

interface StateToProps {
  tasks: Task[]
}

interface DispatchToProps {
  addTimeEntry: (taskId: string, from: Date, to: Date) => AddEntry
}

interface Props extends OwnProps, StateToProps, DispatchToProps {}

interface State {
  timeEntry: Partial<TimeEntry>
  selectedDate: Date
}

type UpdateTaskId = {
  type: 'ADD_TIME_UPDATE_TASK_ID',
  payload: string
}

type UpdateFromDate = {
  type: 'ADD_TIME_UPDATE_FROM_DATE',
  payload: string
}

type UpdateToDate = {
  type: 'ADD_TIME_UPDATE_TO_DATE',
  payload: string
}

type UpdateSelectedDate = {
  type: 'ADD_TIME_UPDATE_SELECTED_DATE',
  payload: Date
}

type Actions = UpdateTaskId | UpdateFromDate | UpdateToDate | UpdateSelectedDate

interface SetState {
  (f: (prevState: State) => Partial<State>, callback?: () => any): void;
}

function mapStateToProps (appState: AppState, ownProps: OwnProps) {
  return {
    tasks: getProjectTasks(appState, ownProps.projectId)
  }
}

function mapDispatchToProps (dispatch: Dispatch<AppActions>, ownProps: OwnProps) {
  return {
    addTimeEntry: (taskId: string, from: Date, to: Date) => dispatch(addEntry(ownProps.projectId, taskId, { from, to }))
  }
}

function reducer (state: State, action: Actions): State {
  switch (action.type) {
    case 'ADD_TIME_UPDATE_TASK_ID':
      return {
        ...state,
        timeEntry: {
          ...state.timeEntry,
          taskId: action.payload
        }
      }

    case 'ADD_TIME_UPDATE_FROM_DATE':
      return {
        ...state,
        timeEntry: {
          ...state.timeEntry,
          from: new Date(`${state.selectedDate.toLocaleTimeString()} {action.payload}`)
        }
      }

    case 'ADD_TIME_UPDATE_TO_DATE':
      return {
        ...state,
        timeEntry: {
          ...state.timeEntry,
          to: new Date(`${state.selectedDate.toLocaleTimeString()} {action.payload}`)
        }
      }

    case 'ADD_TIME_UPDATE_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.payload
      }

    default: return state
  }
}

function dispatcher(setState: SetState, action: Actions) {
  setState((state: State) => reducer(state, action))
}

class AddTimeConnectorClass extends React.PureComponent<Props, State> {
  state: State = {
    timeEntry: {
      id: 'new-id',
      taskId: 'default',
      projectId: this.props.projectId,
      from: new Date(),
      to: new Date()
    },
    selectedDate: new Date()
  }

  updateSelectedDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatcher(this.setState.bind(this), {
      type: 'ADD_TIME_UPDATE_SELECTED_DATE',
      payload: new Date(event.target.value)
    })
  }

  updateFromDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatcher(this.setState.bind(this), {
      type: 'ADD_TIME_UPDATE_FROM_DATE',
      payload: event.target.value
    })
  }

  updateToDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatcher(this.setState.bind(this), {
      type: 'ADD_TIME_UPDATE_TO_DATE',
      payload: event.target.value
    })
  }

  updateTaskHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatcher(this.setState.bind(this), {
      type: 'ADD_TIME_UPDATE_TASK_ID',
      payload: event.target.value
    })
  }

  submitEntryHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isTimeEntry(this.state.timeEntry)) {
      this.props.addTimeEntry(this.state.timeEntry.taskId, this.state.timeEntry.from, this.state.timeEntry.to)
    }
  }

  render() {
    return <AddTime
      tasks={this.props.tasks}
      newEntry={this.state.timeEntry}
      selectedDate={this.state.selectedDate}
      updateSelectedDate={this.updateSelectedDateHandler}
      updateFromDate={this.updateFromDateHandler}
      updateToDate={this.updateToDateHandler}
      updateTask={this.updateTaskHandler}
      submitEntry={this.submitEntryHandler}
    />
  }
}

const AddTimeConnector: React.ComponentClass<OwnProps> = connect<StateToProps, DispatchToProps, OwnProps>(mapStateToProps, mapDispatchToProps)(AddTimeConnectorClass)
export default AddTimeConnector
