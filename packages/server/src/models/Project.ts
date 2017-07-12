import * as uuid from "uuid";
import * as Joi from "joi";

export type Project = {
  id: string;
  taskIds: string[];
  entryIds: string[];
  name: string;
  description: string;
};

const uuidv4 = Joi.string().guid({
  version: ["uuidv4"]
});

export const projectSchema = Joi.object().keys({
  id: uuidv4,
  taskIds: Joi.array().items(uuidv4),
  entryIds: Joi.array().items(uuidv4),
  name: Joi.string(),
  description: Joi.string()
});

export function createProject(name, description): Project {
  return {
    id: uuid.v4(),
    taskIds: [],
    entryIds: [],
    name: name,
    description: description
  };
}

export function validateProject(project: Project): Project {
  return Joi.attempt(project, projectSchema);
}
