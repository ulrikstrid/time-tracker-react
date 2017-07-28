import * as Hapi from "hapi";

import * as repo from "./repository";

export function init(server: Hapi.Server) {
  server.route({
    method: "GET",
    path: "/api/tasks/{taskId}/timeentries",
    config: {
      handler: (request, reply) => {
        repo
          .getTimeEntries(request.server.app.db, request.params.taskId)
          .then(reply)
          .catch(error => {
            console.log(error);
            reply(error, null);
          });
      }
    }
  });

  server.route({
    method: "GET",
    path: "/api/timeentries",
    config: {
      handler: (request, reply) => {
        repo.getTimeEntries(request.server.app.db).then(reply).catch(error => {
          console.log(error);
          reply(error, null);
        });
      }
    }
  });

  server.route({
    method: "GET",
    path: "/api/timeentries/{id}",
    config: {
      handler: (request, reply) => {
        repo
          .getTimeEntry(request.server.app.db, request.params.id)
          .then(reply)
          .catch(error => {
            console.log(error);
            reply(error, null);
          });
      }
    }
  });

  server.route({
    method: "POST",
    path: "/api/timeentries",
    config: {
      handler: (request, reply) => {
        repo
          .saveTimeEntry(
            request.server.app.db,
            request.params.taskId,
            request.payload
          )
          .then(task => reply(null, task))
          .catch(error => {
            console.log(error);
            reply(error, null);
          });
      }
    }
  });

  server.route({
    method: "PATCH",
    path: "/api/timeentries/{id}",
    config: {
      handler: (request, reply) => {
        repo
          .updateTimeEntry(
            request.server.app.db,
            request.params.id,
            JSON.parse(request.payload)
          )
          .then(task => reply(null, task))
          .catch(error => {
            console.log(error);
            reply(error, null);
          });
      }
    }
  });
}
