import * as Hapi from "hapi";
import { createProject } from "../models/Project";

import * as repo from './repository'

export function init(server: Hapi.Server) {
  server.route({
    method: "GET",
    path: "/api/projects/{id}",
    config: {
      handler: (request, reply) => {
        repo.getProject(request.params.id)
          .then(reply);
      }
    }
  });
}
