// utils
import { db, sharesTable } from "../schemas/db.js";

// types
import type {
  IDBDocumentShares,
  IDocumentShares,
} from "../schemas/documentShares.js";

const documentSharesTable = db("document_shares");

export class DocumentShare {
  readonly id?: number;
  docId: number;
  userId: number;

  constructor(documentShare: IDBDocumentShares) {
    this.docId = documentShare.doc_id;
    this.userId = documentShare.user_id;
    this.id = documentShare?.id;
  }

  async create(): Promise<IDocumentShares> {
    const createdShare: IDBDocumentShares[] = await documentSharesTable
      .returning("*")
      .insert({
        doc_id: this.docId,
        user_id: this.userId,
      });
    return this.serialize(createdShare[0]);
  }

  async update(share: IDBDocumentShares): Promise<IDocumentShares | void> {
    if (!this?.id) return;

    const updatedShare: IDBDocumentShares[] = await documentSharesTable
      .returning("*")
      .where({ id: this.id })
      .update(share);

    return this.serialize(updatedShare[0]);
  }

  async get(): Promise<IDocumentShares | void> {
    if (!this?.id) return;

    const found: IDBDocumentShares = await documentSharesTable
      .select("*")
      .where({ id: this.id })
      .first();
    return this.serialize(found);
  }

  async delete(): Promise<void> {
    if (!this.id) return;

    await documentSharesTable.select("*").where({ id: this.id });
  }

  public static async getSharesOfUser(
    id: number,
  ): Promise<IDocumentShares[] | void> {
    return sharesTable.select("*").where({ user_id: id });
  }

  serialize(record: IDBDocumentShares): IDocumentShares {
    return {
      docId: record.doc_id,
      userId: record.user_id,
      id: record?.id,
    };
  }
}
