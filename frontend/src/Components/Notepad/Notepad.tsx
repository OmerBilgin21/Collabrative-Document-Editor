import { useState, useEffect } from "preact/hooks";
import { IDocs } from "../../interfaces/docs";

interface IProps {
  wss: WebSocket;
  selectedDoc: number;
  data: IDocs[] | undefined;
}

const Notepad = ({ wss, selectedDoc, data }: IProps) => {
  const [text, setText] = useState<string>("");
  const foundDoc = data?.find((doc) => doc.id === selectedDoc);
  wss.onmessage = (event) => {
    setText(event.data)
  }

  useEffect(() => {
    console.log('foundDoc: ', foundDoc)
    if (foundDoc?.text) setText(foundDoc.text)
  }, [foundDoc])
  console.log('text: ', text)

  return (
    <div className="h-[80%] min-w-screen bg-black">
      <div className="h-[10%] text-white cent">{foundDoc?.title}</div>
      <div className="h-[90%]">
        <textarea
          className="bg-black text-white h-full w-full"
          // on change requires focus change,
          // onKeyDown is one character behind
          // therefore onKeyUp is chosen
          onKeyUp={(e) => {
            const target = e.target as HTMLTextAreaElement;
            const toSend = { ...foundDoc, text: target.value }

            if (wss.readyState) {
              wss.send(JSON.stringify(toSend))
            }
          }}
          value={text}
        />
      </div>
    </div>
  );
};

export default Notepad;
