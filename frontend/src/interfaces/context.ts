import { Dispatch } from "preact/hooks";
import { IDoc, IDocVersion } from "./docs";
import { SetStateAction } from "preact/compat";
import { IUser } from "./user";

export interface IDocContext {
  selectedDoc: number;
  setSelectedDoc: Dispatch<SetStateAction<number>>;
  docs: IDoc[];
  versionData: IDocVersion | undefined;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | undefined;
  signUp: (user: IUser) => Promise<void | IUser | Error>;
  signIn: (email?: string, password?: string) => Promise<void | IUser | Error>;
}
