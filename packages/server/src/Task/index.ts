import * as Hapi from "hapi";

import * as repo from "./repository";

export function init(server: Hapi.Server) {
	server.route({
		method: "GET",
		path: "/api/tasks",
		config: {
			handler: (request, reply) => {
				repo.getTasks(request.server.app.db).then(reply);
			}
		}
	});

	server.route({
		method: "GET",
		path: "/api/tasks/{id}",
		config: {
			handler: (request, reply) => {
				repo.getTask(request.server.app.db, request.params.id).then(reply);
			}
		}
	});

	server.route({
		method: "POST",
		path: "/api/tasks",
		config: {
			handler: (request, reply) => {
				console.log(request.payload);
				repo
					.saveTask(request.server.app.db, request.payload)
					.then(task => reply(null, task))
					.catch(error => {
						console.log(error);
						reply(error, null);
					});
			}
		}
	});
}
