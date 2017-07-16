import * as Server from "./server";
import * as config from "./config";

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
	console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
	console.error(`unhandledRejection ${reason}`);
});

Server.init(config.init).then(server => {
	if (!server) {
		throw new Error("could not get server");
	}
	server.start(() => {
		if (server.info != null)
			console.log("Server running at: ", server.info.uri);
	});
});
