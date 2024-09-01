// components
import CreateDoc from "../CreateDoc/CreateDoc";

// context
import { useDoc } from "../../context/DocContext";

// hooks
import { useState } from "preact/hooks";

// types
import { IDoc } from "../../interfaces/docs";

const Docs = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { setSelectedDoc, docs } = useDoc();

  return (
    <div className="flex gap-6 w-full h-32 px-6 pb-6 relative min-w-full">
      {docs?.map((doc: IDoc) => {
        return (
          <div
            className="cent flex-col w-[5.7rem] h-max"
            onClick={() => {
              setSelectedDoc(doc.id);
            }}
          >
            <p className="nice-text ">{doc.name}</p>
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
