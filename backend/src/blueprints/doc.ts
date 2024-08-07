import db from "../schemas/db.js";

interface IMutableDocument {
  name: string;
  title: string;
  text: string;
}

interface IDocument extends IMutableDocument {
  id: number;
}

const docsTable = db("docs");

class Document {
  private readonly id: number;
  name: string;
  title: string;
  text: string;
  constructor(doc: IDocument) {
    this.id = doc.id;
    this.text = doc.text;
    this.title = doc.title;
    this.name = doc.name;
  }

  async updateDoc(doc: IMutableDocument) {
    const updatedDoc: IDocument[] = await docsTable
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

  async getDoc() {
    const retrievedDocument: IMutableDocument[] = await docsTable
      .select("*")
      .where({ id: this.id });
    return retrievedDocument[0];
  }

  async deleteDoc() {
    await docsTable.select("*").where({ id: this.id });
  }
}

export default Document;
