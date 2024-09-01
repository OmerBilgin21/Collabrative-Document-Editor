// hooks
import { useEffect, useState, useRef } from "preact/hooks";

// context
import { useDoc } from "../../context/DocContext";

// types
import VersionList from "../VersionList/VersionList";

// utils
import { validate } from "uuid";

interface IProps {
  ws: WebSocket;
}

const Notepad = ({ ws }: IProps) => {
  const [text, setText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { versionData: data, selectedDoc } = useDoc();

  // we need it for initial load
  useEffect(() => {
    if (data) {
      setText(data.text);
    }
  }, [data]);

  const handlePageUnload = (_: BeforeUnloadEvent) => {
    if (selectedDoc !== -1) {
      ws.send(
        JSON.stringify({
          doc_id: selectedDoc,
          text,
        }),
      );
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handlePageUnload);
    return () => window.removeEventListener("beforeunload", handlePageUnload);
  }, []);

  ws.onmessage = (e) => {
    // backend is sending a uuid in case of error
    if (validate(e.data)) {
      window.alert(
        "Connection was lost, please reload the page.\nYou might want to secure your text as well!",
      );
      return;
    }

    if (typeof e.data === "string" && e.data !== text) {
      setText(e.data);
    }
  };

  // The editor doesn't make sense if there's nothing to edit.
  // -Omer
  if (selectedDoc === -1) {
    return <></>;
  }

  return (
    <div className="h-full min-w-full ml-0 m:ml-6 lg:ml-10 xl:ml-16 ">
      <div className="h-full flex w-3/5 shadow-xl">
        <div className="w-36 max-h-full">
          <VersionList setText={setText} id={selectedDoc} />
        </div>
        <div className="w-full min-w-80 h-full">
          <textarea
            ref={textAreaRef}
            className="bg-slate-100 text-black text-left h-full w-full px-4 rounded-r-lg "
            // on change requires focus change,
            // onKeyDown is one character behind
            // therefore onKeyUp is chosen
            onKeyUp={(e) => {
              const target = e.target as HTMLTextAreaElement;
              if (ws.readyState && selectedDoc !== -1) {
                ws.send(
                  JSON.stringify({ doc_id: selectedDoc, text: target.value }),
                );
              }
              console.log("target: ", target.value);
            }}
            value={text}
          />
        </div>
      </div>
    </div>
  );
};

export default Notepad;
