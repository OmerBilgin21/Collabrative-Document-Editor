// components
import CreateDoc from "../CreateDoc/CreateDoc";

// hooks
import { useState } from "preact/hooks";
import { fetcher } from "../../utils/api";

// types
import type { Dispatch } from "preact/hooks";
import { IDoc } from "../../interfaces/docs";
import useSWR from "swr";

interface IProps {
  setSelectedDoc: Dispatch<number>;
}

const Docs = ({ setSelectedDoc }: IProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const { data }: { data: IDoc[] } = useSWR("/docs", fetcher);

  return (
    <div className="doc-page-wrapper flex gap-6 w-full h-[90%] px-6 relative min-w-full ">
      {data.map((doc: IDoc) => {
        return (
          <div
            className="w-[5.7rem] h-6 text-center"
            onClick={() => {
              setSelectedDoc(doc.id);
            }}
          >
            <p className="max-w-[5.7rem] h-6 nice-text">{doc.name}</p>
            <img className="rounded-md" src="/doc.svg" alt="document-symbol" />
          </div>
        );
      })}

      <button
        className="w-6 h-6 absolute top-5 right-5"
        onClick={() => setIsFormOpen((prev) => !prev)}
      >
        <img src="/plus.svg" alt="add-document-button" />
      </button>
      <div
        className={
          isFormOpen
            ? "transform transition block duration-500 absolute top-5 right-5"
            : "w-0 h-0 overflow-hidden hidden"
        }
      >
        <CreateDoc setIsFormOpen={setIsFormOpen} />
      </div>
    </div>
  );
};

export default Docs;
