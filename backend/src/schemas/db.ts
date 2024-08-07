import knex from "knex";
import { DB_HOST, DB_NAME, DB_PORT, DB_USER } from "../envs.js";

const db = knex({
  client: "pg",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    database: DB_NAME,
    ssl: false,
  },
});

const docVersionsTable = await db.schema.hasTable("docVersions");

if (!docVersionsTable) {
  await db.schema.withSchema("public").createTable("docVersions", (table) => {
    table.increments();
    table.string("text");
    table.string("title");
    table.string("name");
  });
}

const docsTable = await db.schema.hasTable("docs");

if (!docsTable) {
  await db.schema.withSchema("public").createTable("docs", (table) => {
    table.increments("id");
    table.string("text");
    table.string("title");
    table.string("name");
  });
}

export default db;
