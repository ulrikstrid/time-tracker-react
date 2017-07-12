import * as Hapi from "hapi";

import * as Projects from "./Projects";

export function init(configs?: { port: number }) {
  return new Promise<Hapi.Server>(resolve => {
    const port = process.env.PORT || configs.port;
    const server = new Hapi.Server();

    server.connection({
      port: port,
      routes: {
        cors: true
      }
    });

    Projects.init(server);

    resolve(server);
  });
}
