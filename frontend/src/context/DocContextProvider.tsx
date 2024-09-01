// hooks
import useSWR from "swr";
import { useState } from "preact/compat";

// context
import { DocContext } from "./DocContext";

// utils
import { fetcher } from "../utils/api";

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
  const [versionData, setVersionData] = useState<IDocVersion | undefined>(
    undefined,
  );

  const { data: docs }: { data: IDoc[] } = useSWR("/docs", fetcher);

  const { data }: { data: IDocVersion } = useSWR(
    () => (selectedDoc !== -1 ? `/version/${selectedDoc}/latest` : null),
    fetcher,
  );

  setVersionData(data);

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
