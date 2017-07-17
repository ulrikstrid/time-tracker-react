import * as Lab from "lab";
import * as Code from "code";
const lab = (exports.lab = Lab.script());

import * as Project from "../../src/Projects/model";

lab.test("retuirns true when 1 + 1 equals 2", done => {
	Code.expect(1 + 1).to.equal(2);
	done();
});

lab.test("New project is valid project", done => {
	const newProject = Project.createProject("test", "test desc");
	const validProject = Project.validateProject(newProject);

	Code.expect(validProject).to.equal(newProject);
	done();
});
