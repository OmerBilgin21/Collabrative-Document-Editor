// utils
import db from "../schemas/db.js";

// types
import {
  IDocumentVersion,
  IDocumentVersionCreate,
} from "../schemas/version.js";
import { getLatestVersionEntry } from "../utils/version.js";

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
    const latest = await getLatestVersionEntry(this.doc_id.toString());
    if (latest) {
      const directDiff =
        (new Date().getTime() - new Date(latest.created_at).getTime()) /
        (60 * 1000);
      // hourly versioning
      if (directDiff < 60) {
        const updated = await db
          .update({ text: this.text })
          .from("doc_versions")
          .returning("*")
          .where({ id: latest.id });
        return updated[0];
      }
    }

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
