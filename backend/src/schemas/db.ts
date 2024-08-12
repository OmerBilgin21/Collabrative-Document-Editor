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

const docsTable = await db.schema.hasTable("docs");

if (!docsTable) {
  await db.schema.withSchema("public").createTable("docs", (table) => {
    table.increments("id", { primaryKey: true }).unsigned();
    table.string("name").notNullable();
  });
}

const docVersionsTable = await db.schema.hasTable("doc_versions");

if (!docVersionsTable) {
  await db.schema.withSchema("public").createTable("doc_versions", (table) => {
    table.increments("id", { primaryKey: true }).unsigned();
    table.integer("doc_id").unsigned().references("docs.id");
    table.string("text").notNullable();
    // for simplicity disable timezones
    table.datetime("created_at", { useTz: false }).notNullable();
  });
}

export default db;
