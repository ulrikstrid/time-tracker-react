import * as PGM from "node-pg-migrate";

export const up = (pgm: PGM.MigrationBuilder) => {
  pgm.createTable("time_entry", {
    id: {
      primaryKey: true,
      type: "uuid",
      unique: true,
      notNull: true
    },
    start_time: {
      notNull: true,
      type: "time"
    },
    end_time: {
      notNull: true,
      type: "time"
    },
    task_id: {
      type: "uuid",
      references: "task",
      notNull: false
    }
  });
};

export const down = (pgm: PGM.MigrationBuilder) => {
  pgm.dropTable("time_entry");
};
