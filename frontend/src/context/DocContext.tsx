import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { IDocContext } from "../interfaces/context";

const DocContext = createContext<IDocContext | undefined>(undefined);

const useDoc = (): IDocContext => {
  const context = useContext(DocContext);

  if (context === undefined) {
    throw new Error("useLaw must be used within a ThemeProvider");
  }
  return context;
};

export { DocContext, useDoc };
