import { TimeEntry } from '../models/TimeEntry'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface Props extends RouteComponentProps<{ entryId: string, projectId: string }> {
  timeEntries: TimeEntry[]
  addTimeEntry: (taskId: string, from: Date, to: Date) => void
  removeTimeEntry: (id: string) => void
}

function TimeItem (timeEntry: TimeEntry) {
  return <li key={timeEntry.id}>{timeEntry.from.toDateString()}</li>
}

export function AddTime (props: Props) {
  return (
    <div>
      <form>
        <input type='date' />
        <input type='date' />
        <input type='submit' />
      </form>

      <ul>
        {props.timeEntries.map(TimeItem)}
      </ul>
    </div>
  )
}
