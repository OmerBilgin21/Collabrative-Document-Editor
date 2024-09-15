import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { IAuthContext } from "../interfaces/context";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthContext, useAuth };
