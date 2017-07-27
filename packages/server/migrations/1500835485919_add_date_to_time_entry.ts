import * as PGM from "node-pg-migrate";

exports.up = (pgm: PGM.MigrationBuilder) => {
  pgm.addColumn("time_entry", {
    date: {
      notNull: true,
      type: "date"
    }
  });
};

exports.down = (pgm: PGM.MigrationBuilder) => {
  pgm.dropColumns("time_entry", ["date"]);
};
