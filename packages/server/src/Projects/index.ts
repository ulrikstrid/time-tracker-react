import * as Hapi from "hapi";
import { createProject } from "../models/Project";

export function init(server: Hapi.Server) {
  console.log("init projects");
  server.route({
    method: "GET",
    path: "/api/projects/{id}",
    config: {
      handler: (request, reply) => {
        const project = createProject(request.params.id, "description");
        return reply(project);
      }
    }
  });
}
