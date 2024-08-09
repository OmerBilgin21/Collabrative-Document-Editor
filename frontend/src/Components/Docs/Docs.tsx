// components
import CreateDoc from "./CreateDoc";

// hooks
import { useState, useEffect } from "preact/hooks";

// utils
import { fetcher } from "../../utils/api";

// types
import type { Dispatch } from "preact/hooks";
import { IDoc } from "../../interfaces/docs";

interface IProps {
  setSelectedDoc: Dispatch<number>;
  selectedDoc: number;
}

const Docs = ({ selectedDoc, setSelectedDoc }: IProps) => {
  const [data, setData] = useState<IDoc[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const resData = await fetcher("/docs");
      if (resData) setData(resData);
    };

    getData();
  }, []);

  return (
    <div className="h-[30%] min-w-screen relative">
      <div className="flex gap-6 w-full h-[90%] px-6 doc-wrapper">
        {data.map((doc) => {
          return (
            <div
              className="w-[5.7rem] h-6"
              onClick={() => {
                setSelectedDoc(doc.id);
              }}
            >
              <p className="max-w-[5.7rem] h-6 text-ellipsis whitespace-nowrap overflow-hidden">
                {doc.name}
              </p>
              <img
                className="rounded-md"
                src="/doc.svg"
                alt="document-symbol"
              />
            </div>
          );
        })}
      </div>

      <div className="h-[10%] w-full flex justify-center items-center text-center bg-black text-white align-middle">
        <p>{data.find((e) => e.id === selectedDoc)?.title}</p>
      </div>
      <button
        className="w-6 h-6 -mt-9"
        onClick={() => setIsFormOpen((prev) => !prev)}
      >
        <img src="/plus.svg" alt="add-document-button" />
      </button>
      <div
        className={
          isFormOpen
            ? "transform transition block duration-500"
            : "w-0 h-0 overflow-hidden hidden"
        }
      >
        <CreateDoc />
      </div>
    </div>
  );
};

export default Docs;
