import * as uuid from "uuid";
import * as Joi from "joi";

export type Task = {
	id: string;
	// entryIds: string[];
	name: string;
	description: string | null;
};

export type NewTask = {
	name: string;
	description: string | null;
};

const uuidv4 = Joi.string().guid({
	version: ["uuidv4"]
});

const taskSchema = Joi.object().keys({
	id: uuidv4,
	// entryIds: Joi.array().items(uuidv4),
	name: Joi.string(),
	description: Joi.string().allow(null)
});

export function createTask(name: string, description?: string | null): Task {
	return {
		id: uuid.v4(),
		// entryIds: [],
		name: name,
		description: description || null
	};
}

export function validateTask(task: any): Promise<Task> {
	return new Promise((resolve, reject) => {
		Joi.validate(task, taskSchema, (error, value) => {
			if (error) return reject(error);
			resolve(value);
		});
	});
}

export function isTask(task: any): task is Task {
	const result = Joi.validate(task, taskSchema, { abortEarly: true });
	if (result.error == null) return true;
	return false;
}
