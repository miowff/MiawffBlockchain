import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import getEnv from "src/utils/getEnv";

const poolConnection = mysql.createPool({
  connectionLimit: 100,
  host: getEnv("DB_ENDPOINT"),
  user: getEnv("DB_USERNAME"),
  database: "MiawffBlockchainDB",
  password: getEnv("DB_PASSWORD"),
  port: parseInt(getEnv("DB_PORT") as string),
});

export const database = drizzle(poolConnection);
