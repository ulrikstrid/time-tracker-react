export type InitConfig = {
	server: ServerConfig;
	db: DbConfig;
};

export type DbConfig = {
	host: string;
	port: number;
	database: string;
	user: string;
	password: string;
};

export type ServerConfig = {
	port: number | string;
};

export const server: ServerConfig = {
	port: process.env.PORT || 4001
};

const dbPort = (process.env.DB_PORT || 5432).toString();

export const db: DbConfig = {
	host: process.env.DB_HOST || "localhost",
	port: parseInt(dbPort, 10),
	database: process.env.DB_NAME || "time_tracker_dev",
	user: process.env.DB_USER || "ulrik",
	password: process.env.DB_PASSWORD || "postgres"
};

export const init: InitConfig = {
	server,
	db
};
