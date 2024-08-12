export interface IDocumentVersionCreate {
  doc_id: number;
  text: string;
}

export interface IDocumentVersion extends IDocumentVersionCreate {
  id: number;
  created_at: Date;
}
