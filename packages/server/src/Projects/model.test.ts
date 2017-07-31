import * as Project from "../../src/Projects/model";

test("New project is valid project", () => {
  const newProject = Project.createProject("test", "test desc");
  const validProject = Project.validateProject(newProject);

  expect(validProject).toEqual(newProject);
});
