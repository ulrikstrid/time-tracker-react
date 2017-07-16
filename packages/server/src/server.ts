import * as Hapi from "hapi";
import * as pgp from "pg-promise";

import * as Projects from "./Projects";
import { InitConfig } from "./config";

export function init(configs: InitConfig) {
	return new Promise<Hapi.Server>(resolve => {
		const port = process.env.PORT || configs.server.port;
		const server = new Hapi.Server();
		const db = pgp()(configs.db);

		console.log(db);

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
