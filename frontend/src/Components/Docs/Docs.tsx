import { IDocs } from "../../interfaces/docs";

interface IProps {
  data: IDocs[] | undefined;
  //selectedDoc: number | undefined;
  setSelectedDoc: React.Dispatch<number>;
}

const Docs = ({ data, setSelectedDoc }: IProps) => {

  return (
    <div className="h-[20%] min-w-screen min-w-screen flex gap-6 px-6 doc-wrapper">
      {data?.map((doc) => {
        return (
          <div className="w-[5.7rem] h-6" onClick={() => { setSelectedDoc(doc.id) }}>
            <p className="max-w-[5.7rem] h-6 text-ellipsis whitespace-nowrap overflow-hidden">{doc.title}</p>
            <img className="rounded-md" src="/doc.svg" alt="document-symbol" />
          </div>
        )
      })}
    </div>
  );
};

export default Docs;
