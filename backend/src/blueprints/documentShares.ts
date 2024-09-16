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
    return DocumentShare.serialize(createdShare[0]);
  }

  async update(share: IDBDocumentShares): Promise<IDocumentShares | void> {
    if (!this?.id) return;

    const updatedShare: IDBDocumentShares[] = await documentSharesTable
      .returning("*")
      .where({ id: this.id })
      .update(share);

    return DocumentShare.serialize(updatedShare[0]);
  }

  async get(): Promise<IDocumentShares | void> {
    if (!this?.id) return;

    const found: IDBDocumentShares = await documentSharesTable
      .select("*")
      .where({ id: this.id })
      .first();
    return DocumentShare.serialize(found);
  }

  async delete(): Promise<void> {
    if (!this.id) return;

    await documentSharesTable.select("*").where({ id: this.id });
  }

  public static async getSharesOfUser(
    id: number,
  ): Promise<IDocumentShares[] | void> {
    const sharesOfUser: IDBDocumentShares[] = await sharesTable
      .select("*")
      .where({ user_id: id });
    return sharesOfUser?.map((share) => this.serialize(share));
  }

  public static async getSharesOfDocument(
    id: number,
  ): Promise<void | IDocumentShares[]> {
    const sharesOfDoc: IDBDocumentShares[] = await sharesTable
      .select("*")
      .where({ id });
    return sharesOfDoc.map((share) => this.serialize(share));
  }

  static serialize(record: IDBDocumentShares): IDocumentShares {
    return {
      docId: record.doc_id,
      userId: record.user_id,
      id: record?.id,
    };
  }
}
