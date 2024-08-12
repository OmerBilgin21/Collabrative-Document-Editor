export interface IDoc {
  id: number;
  name: string;
}

export interface IDocVersion {
  id: number;
  docId: number;
  text: string;
  created_at: string;
}
