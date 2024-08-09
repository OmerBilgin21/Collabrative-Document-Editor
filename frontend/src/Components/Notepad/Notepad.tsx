// hooks
import useSWR from "swr";
import { useEffect, useState } from "preact/hooks";

// utils
import { fetcher } from "../../utils/api";
import { mergeString } from "../../utils/resolver";

// types
import { IDoc } from "../../interfaces/docs";

interface IProps {
  ws: WebSocket;
  selectedDoc: number;
}

const Notepad = ({ ws, selectedDoc }: IProps) => {
  const [text, setText] = useState<string>("");

  const { data } = useSWR<IDoc>(`/docs/${selectedDoc}`, fetcher);

  // only for initial data and file changes
  useEffect(() => {
    if (data) setText(data.text);
  }, [data]);

  // keep track of the changes
  useEffect(() => {
    // our state is one char ahead of the incoming message
    if (ws.readyState && data) {
      ws.send(JSON.stringify({ id: data.id, text }));
    }
  }, [text]);

  ws.onmessage = (e) => {
    if (e.data !== text && text.indexOf(e.data)) {
      setText(mergeString(e.data, text));
    }
  };

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
            setText(target.value);
          }}
          value={text}
        />
      </div>
    </div>
  );
};

export default Notepad;
