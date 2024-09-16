// hooks
import { useState, useEffect } from "preact/compat";

// context
import { DocContext } from "./DocContext";

// utils
import { useAxios } from "../utils/api";

// types
import type { JSX } from "preact/compat";
import type { ReactNode } from "preact/compat";
import type { IDoc, IDocVersion } from "../interfaces/docs";

const DocContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [selectedDoc, setSelectedDoc] = useState<number>(-1);
  const [docs, setDocs] = useState<IDoc[]>([]);
  const [versionData, setVersionData] = useState<IDocVersion | undefined>(
    undefined,
  );

  useEffect(() => {
    const getDocs = async () => {
      const docs: IDoc[] = await useAxios("/docs", "get");
      setDocs(docs);
    };
    const getVersions = async () => {
      if (selectedDoc === -1) return;
      const vers = await useAxios(`/version/${selectedDoc}/latest`, "get");
      setVersionData(vers);
    };

    getDocs();
    getVersions();
  }, [selectedDoc]);

  return (
    <DocContext.Provider
      value={{
        setSelectedDoc,
        selectedDoc,
        versionData,
        docs,
      }}
    >
      {children}
    </DocContext.Provider>
  );
};

export default DocContextProvider;
