import { Dispatch, useState, useEffect } from "preact/hooks";
import { IDocs } from "../../interfaces/docs";
import { fetcher } from "../../utils/api";

interface IProps {
  setSelectedDoc: Dispatch<number>;
  selectedDoc: number;
}

const Docs = ({ selectedDoc, setSelectedDoc }: IProps) => {
  const [data, setData] = useState<IDocs[]>([]);

  useEffect(() => {
    const getData = async () => {
      const resData = await fetcher("/docs");
      if (resData) setData(resData);
    };

    getData();
  }, []);

  return (
    <div className="h-[30%] min-w-screen">
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

      <div className="h-[10%] w-full flex justify-center items-center text-center bg-black text-white">
        <p>{data.find((e) => e.id === selectedDoc)?.title}</p>
      </div>
    </div>
  );
};

export default Docs;
