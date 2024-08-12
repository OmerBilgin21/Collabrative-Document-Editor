// utils
import db from "../schemas/db.js";

// types
import {
  IDocumentVersion,
  IDocumentVersionCreate,
} from "../schemas/version.js";

const docVersionsTable = db("doc_versions");

export class DocumentVersionCreate {
  readonly doc_id: number;
  text: string;
  created_at: Date;

  constructor(doc: IDocumentVersionCreate) {
    this.doc_id = doc.doc_id;
    this.text = doc.text;
    this.created_at = new Date();
  }

  async createDocVersion(): Promise<IDocumentVersion> {
    const createdDocVersion: IDocumentVersion[] = await docVersionsTable
      .returning("*")
      .insert({
        doc_id: this.doc_id,
        text: this.text,
        created_at: this.created_at,
      });
    return createdDocVersion[0];
  }
}

export class DocumentVersion extends DocumentVersionCreate {
  readonly id: number;

  constructor(doc: IDocumentVersion) {
    super({ doc_id: doc.doc_id, text: doc.text });
    this.id = doc.id;
  }

  async updateDocText(): Promise<{ text: string }> {
    const updatedVersion: { text: string }[] = await docVersionsTable
      .returning("text")
      .where({ id: this.doc_id })
      .update({ text: this.text });

    return updatedVersion[0];
  }
}
