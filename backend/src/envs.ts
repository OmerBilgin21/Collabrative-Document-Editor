import dotenv from "dotenv";
dotenv.config();

const { DB_PORT_ENV, DB_USER, DB_HOST, DB_NAME, NODE_ENV, CONNECTION_STR } =
	process.env;

let DB_PORT = 5432;
if (DB_PORT_ENV) {
	DB_PORT = parseInt(DB_PORT_ENV);
}

export { DB_USER, DB_HOST, DB_NAME, NODE_ENV, DB_PORT, CONNECTION_STR };
