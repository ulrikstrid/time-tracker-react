import * as PGM from "node-pg-migrate";

export const up = (pgm: PGM.MigrationBuilder) => {
	pgm.createTable("time_entry", {
		id: {
			primaryKey: true,
			type: "uuid",
			unique: true,
			notNull: true
		},
		startTime: {
			notNull: true,
			type: "timestamp"
		},
		endTime: {
			notNull: true,
			type: "timestamp"
		},
		taskId: {
			type: "uuid",
			references: "task",
			notNull: true
		}
	});
};

export const down = (pgm: PGM.MigrationBuilder) => {
	pgm.dropTable("time_entry");
};
