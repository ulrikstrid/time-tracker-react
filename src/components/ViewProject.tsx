import * as React from 'react'

import { Task } from '../models/Task'
import { TimeEntry } from '../models/TimeEntry'
import { Project } from '../models/Project'

export interface Props {
  project: Project
  tasks: Task[]
  timeEntries: TimeEntry[]
}

export function TaskRow (task: Task) {
  return (
    <tr key={task.id}>
      <td>{task.name}</td>
      <td>{task.description}</td>
    </tr>
  )
}

export function TimeEntryRow (entry: TimeEntry) {
  return (
    <tr key={entry.id}>
      <td>{entry.from.toTimeString()}</td>
      <td>{entry.to.toTimeString()}</td>
      <td>{entry.taskId}</td>
    </tr>
  )
}

export function ProjectList (props: Props) {
  return (
    <div>
      <h2>{props.project.name}</h2>
      <p>{props.project.description}</p>

      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map(TaskRow)}
        </tbody>
      </table>

      <h1>Time entries</h1>
      <table>
        <thead>
          <tr>
            <th>from</th>
            <th>to</th>
            <th>task</th>
          </tr>
        </thead>
        <tbody>
          {props.timeEntries.map(TimeEntryRow)}
        </tbody>
      </table>
    </div>
  )
}

export default ProjectList
