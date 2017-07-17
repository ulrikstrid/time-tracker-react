import { Task, NewTask, createTask, validateTask } from "./model";
import * as pga from "pg-promise";

export function getTasks(db: pga.IDatabase<any>): Promise<Task[]> {
	return db.any(
		`
      SELECT *
      FROM task
    `
	);
}

export function getTask(db: pga.IDatabase<any>, id: string): Promise<Task> {
	return db.one(
		`
      SELECT *
      FROM task
      WHERE id = $1
    `,
		[id]
	);
}

export function saveTask(
	db: pga.IDatabase<any>,
	newTask: NewTask
): Promise<Task> {
	return validateTask(createTask(newTask.name, newTask.description))
		.then(validTask => {
			return db.one(
				`
          INSERT INTO task(id, name, description)
          VALUES($1, $2, $3)
          RETURNING id, name, description
        `,
				[validTask.id, validTask.name, validTask.description]
			);
		})
		.then(task => {
			console.log(task);
			return task;
		});
}
