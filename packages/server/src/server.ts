import * as Hapi from "hapi";
import * as pgp from "pg-promise";

import * as Projects from "./Projects";
import * as Task from "./Task";
import * as TimeEntry from "./TimeEntry";
import { InitConfig } from "./config";

export function init(configs: InitConfig) {
  return new Promise<Hapi.Server>(resolve => {
    const port = process.env.PORT || configs.server.port;
    const server = new Hapi.Server();
    const pga = pgp();

    // date should be returned as text
    pga.pg.types.setTypeParser(1082, val => val);

    const db = pga(configs.db);

    server.app.db = db;

    server.connection({
      port: port,
      routes: {
        cors: true
      }
    });

    Projects.init(server);
    Task.init(server);
    TimeEntry.init(server);

    resolve(server);
  });
}
