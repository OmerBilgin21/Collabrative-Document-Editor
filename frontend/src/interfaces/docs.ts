export interface IDocs {
  id: number;
  name: string;
  title: string;
  text: string;
}

export interface IDocsContext {
  data: IDocs[];
}
