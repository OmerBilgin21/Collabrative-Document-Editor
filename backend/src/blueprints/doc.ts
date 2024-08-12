// utils
import db from "../schemas/db.js";

// types
import type { IDocument, ICreateDoc } from "../schemas/doc.js";

const docVersionsTable = db("docs");

export class CreateDoc {
  name: string;

  constructor(doc: ICreateDoc) {
    this.name = doc.name;
  }

  async createDoc(): Promise<IDocument> {
    const createdDoc: IDocument[] = await db("docs").returning("*").insert({
      name: this.name,
    });
    return createdDoc[0];
  }
}

export class Document extends CreateDoc {
  readonly id: number;

  constructor(doc: IDocument) {
    super({ name: doc.name });
    this.id = doc.id;
  }

  async updateDoc(doc: Document) {
    const updatedDoc: Document[] = await docVersionsTable
      .returning("*")
      .where({ id: this.id })
      .update(doc);
    return updatedDoc[0];
  }

  async getDoc(): Promise<IDocument> {
    return await docVersionsTable.select("*").where({ id: this.id }).first();
  }

  async deleteDoc() {
    await docVersionsTable.select("*").where({ id: this.id });
  }
}
