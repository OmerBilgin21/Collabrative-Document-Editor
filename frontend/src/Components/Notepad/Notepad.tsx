import useSWR from "swr";
import { IDoc } from "../../interfaces/docs";
import { fetcher } from "../../utils/api";

interface IProps {
  ws: WebSocket;
  selectedDoc: number;
}

const Notepad = ({ ws, selectedDoc }: IProps) => {
  // this is much much more performant than any algorithm I could come up with
  // TODO either learn why or reinvent it
  const { data } = useSWR<IDoc>(`/docs/${selectedDoc}`, fetcher, {
    refreshInterval: 100,
  });
  console.log("data: ", data);
  return (
    <div className="h-[80%] min-w-screen bg-black">
      <div className="h-[90%]">
        <textarea
          className="bg-black text-white h-full w-full mt-6"
          // on change requires focus change,
          // onKeyDown is one character behind
          // therefore onKeyUp is chosen
          onKeyUp={(e) => {
            const target = e.target as HTMLTextAreaElement;

            if (ws.readyState && target.value) {
              ws.send(JSON.stringify({ id: selectedDoc, text: target.value }));
            }
          }}
          value={data?.text || ""}
        />
      </div>
    </div>
  );
};

export default Notepad;
