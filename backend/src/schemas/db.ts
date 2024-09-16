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

const hasDocsTable = await db.schema.hasTable("docs");

if (!hasDocsTable) {
  await db.schema.withSchema("public").createTable("docs", (table) => {
    table.increments("id", { primaryKey: true }).unsigned();
    table.integer("owner_id").unsigned().references("users.id").notNullable();
    table.string("name").notNullable();
  });
}

const hasDocVersionsTable = await db.schema.hasTable("doc_versions");

if (!hasDocVersionsTable) {
  await db.schema.withSchema("public").createTable("doc_versions", (table) => {
    table.increments("id", { primaryKey: true }).unsigned();
    table.integer("doc_id").unsigned().references("docs.id").notNullable();
    table.text("text").notNullable();
    // for simplicity disable timezones
    table.datetime("created_at", { useTz: false }).notNullable();
  });
}

const hasUsersTable = await db.schema.hasTable("users");

if (!hasUsersTable) {
  await db.schema.withSchema("public").createTable("users", (table) => {
    table.increments("id", { primaryKey: true }).unsigned();
    table.string("email").notNullable();
    table.string("name").notNullable();
    table.string("surname").notNullable();
    table.string("password").notNullable();
  });
}

const hasDocumentSharesTable = await db.schema.hasTable("document_shares");

if (!hasDocumentSharesTable) {
  await db.schema
    .withSchema("public")
    .createTable("document_shares", (table) => {
      table.increments("id", { primaryKey: true }).unsigned();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
      table
        .integer("doc_id")
        .unsigned()
        .references("docs.id")
        .onDelete("CASCADE");
    });
}

const usersTable = db("users");
const docsTable = db("docs");
const versTable = db("doc_versions");
const sharesTable = db("document_shares");

export { db, usersTable, docsTable, versTable, sharesTable };
