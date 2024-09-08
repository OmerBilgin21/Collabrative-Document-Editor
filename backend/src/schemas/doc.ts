export interface ICreateDoc {
  name: string;
  owner_id: number;
}

export interface IDocument extends ICreateDoc {
  id: number;
}
