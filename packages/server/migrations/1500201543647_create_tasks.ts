import * as PGM from "node-pg-migrate";

export const up = (pgm: PGM.MigrationBuilder) => {
	pgm.createTable("task", {
		id: {
			primaryKey: true,
			type: "uuid",
			unique: true,
			notNull: true
		},
		name: {
			type: "string",
			notNull: true
		},
		description: {
			type: "string",
			notNull: false
		}
	});
};

export const down = (pgm: PGM.MigrationBuilder) => {
	pgm.dropTable("task");
};
