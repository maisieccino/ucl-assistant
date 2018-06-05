exports.up = knex =>
  knex.schema.createTable("mappings", table => {
    table
      .string("upi")
      .notNullable()
      .primary();
    table.string("token").notNullable();
    table.timestamps();
  });

exports.down = knex => knex.schema.dropTable("mappings");
