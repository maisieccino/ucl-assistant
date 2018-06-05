// Update with your config settings.

require("dotenv").config();

const defaultObj = {
  client: "postgresql",
  connection: {
    database: process.env.POSTGRES_NAME || "notifications",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASS || "",
    port: process.env.POSTGRES_PORT || 5432,
    host: process.env.POSTGRES_HOST || "localhost",
  },
};

module.exports = {
  development: {
    ...defaultObj,
  },

  staging: {
    ...defaultObj,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    ...defaultObj,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
