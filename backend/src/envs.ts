import dotenv from "dotenv";
dotenv.config();

const {
  DB_PORT_ENV = 5432,
  DB_USER,
  DB_HOST = "localhost",
  DB_NAME,
  NODE_ENV = "DEV",
  ERROR_CODE,
  SECRET_KEY = "my very secret key",
} = process.env;

const DB_PORT = Number(DB_PORT_ENV);

export { ERROR_CODE, DB_USER, DB_HOST, DB_NAME, NODE_ENV, DB_PORT, SECRET_KEY };
