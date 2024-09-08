export interface IDocumentSharesCreate {
  user_id: number;
  doc_id: number;
}

export interface IDocumentShares extends IDocumentSharesCreate {
  id: number;
}
