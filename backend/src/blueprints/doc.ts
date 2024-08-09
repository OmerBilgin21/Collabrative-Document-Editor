// utils
import db from "../schemas/db.js";

// types
import type { IDocument, ICreateDoc } from "./interfaces.js";

const docsTable = db("docs");

export class CreateDoc {
  name: string;
  title: string;

  constructor(doc: ICreateDoc) {
    this.name = doc.name;
    this.title = doc.title;
  }

  async createDoc(): Promise<IDocument> {
    return await db("docs").insert({
      title: this.title,
      name: this.name,
      text: " ",
    });
  }
}

export class Document extends CreateDoc {
  readonly id?: number;
  text: string;

  constructor(doc: IDocument) {
    super({ name: doc.name, title: doc.title });
    this.id = doc.id;
    this.text = doc.text;
  }

  async updateDoc(doc: Document) {
    const updatedDoc: Document[] = await docsTable
      .returning("*")
      .where({ id: this.id })
      .update(doc);
    return updatedDoc[0];
  }

  async updateDocText(text: string): Promise<IDocument> {
    return await docsTable
      .returning("text")
      .where({ id: this.id })
      .update({ text });
  }

  async getDoc(): Promise<IDocument> {
    return await docsTable.select("*").where({ id: this.id }).first();
  }

  async deleteDoc() {
    await docsTable.select("*").where({ id: this.id });
  }
}
