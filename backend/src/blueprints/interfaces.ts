export interface ICreateDoc {
  name: string;
  title: string;
}

export interface IDocument extends ICreateDoc {
  id: number;
  text: string;
}
