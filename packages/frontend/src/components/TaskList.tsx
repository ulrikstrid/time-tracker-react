import { RemoveTask } from "../state/actionCreators/tasks";
import * as React from "react";
import { Link } from "react-router-dom";

import { Task } from "../models/Task";

interface Props {
  tasks: Task[];
  removeTask: (id: string) => RemoveTask;
}

function TaskRow(removeTask: (id: string) => RemoveTask) {
  return (task: Task) => {
    const clickHandler = () => removeTask(task.id);
    return (
      <tr key={task.id}>
        <td>
          {task.name}
        </td>
        <td>
          {task.description}
        </td>
        <td>
          {task.entryIds.length}
        </td>
        <td>
          <Link to={`/task/${task.id}`}>link</Link>
        </td>
        <td>
          <button onClick={clickHandler}>Remove</button>
        </td>
      </tr>
    );
  };
}

function TaskList(props: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Task name</th>
          <th>Description</th>
          <th>Number of tasks</th>
          <th>Link</th>
          <th>Remove task</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map(TaskRow(props.removeTask))}
      </tbody>
    </table>
  );
}

export default TaskList;
