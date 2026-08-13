import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,

  dialect: "postgres",
  storage: ":memory:",

  // RDS requires encrypted connections; enable SSL.
  // rejectUnauthorized:false accepts the RDS-managed cert without the CA bundle.
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
