import { Dispatch } from "preact/hooks";
import { IDoc, IDocVersion } from "./docs";
import { SetStateAction } from "preact/compat";

export interface IDocContext {
  selectedDoc: number;
  setSelectedDoc: Dispatch<SetStateAction<number>>;
  docs: IDoc[];
  versionData: IDocVersion | undefined;
}
