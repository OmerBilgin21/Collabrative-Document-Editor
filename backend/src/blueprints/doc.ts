// utils
import db from "../schemas/db.js";

// types
import type { IDocument, ICreateDoc } from "../schemas/doc.js";
import { IUser } from "../schemas/user.js";

const docVersionsTable = db("docs");

export class CreateDoc {
  name: string;
  readonly owner_id: number;

  constructor(doc: ICreateDoc) {
    this.name = doc.name;
    this.owner_id = doc.owner_id;
  }

  async createDoc(): Promise<IDocument> {
    const createdDoc: IDocument[] = await db("docs").returning("*").insert({
      name: this.name,
      owner_id: this.owner_id,
    });
    return createdDoc[0];
  }
}

export class Document extends CreateDoc {
  readonly id: number;

  constructor(doc: IDocument) {
    super({
      name: doc.name,
      owner_id: doc.owner_id,
    });
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

  public static async getDocumentById(id: number): Promise<IUser | void> {
    return await db.select("*").from<IUser>("docs").where({ id }).first();
  }
}
