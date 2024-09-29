// external
import AceEditor from "react-ace";

// hooks
import { useEffect, useState } from "preact/hooks";

// context
import { useDoc } from "../../context/DocContext";

// types
import VersionList from "../VersionList/VersionList";

// utils
import { validate } from "uuid";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-searchbox";

interface IProps {
  ws: WebSocket;
}

const Notepad = ({ ws }: IProps) => {
  const [text, setText] = useState<string>("");

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
        "Connection was lost, please reload the page.\nYou might want to secure (copy) your text as well!",
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
    <div className="h-96 lg:min-h-screen w-full ml-0">
      <div className="h-full flex w-full shadow-xl">
        <div className="w-36 max-h-full">
          <VersionList setText={setText} id={selectedDoc} />
        </div>
        <div className="w-full h-full">
          <AceEditor
            mode="text"
            style={{
              display: "flex",
              // had to define these with empty strings to
              // make them work with tailwind
              width: "",
              height: "",
            }}
            onChange={(e) => {
              if (ws.readyState) {
                ws.send(JSON.stringify({ doc_id: selectedDoc, text: e }));
              }
            }}
            value={text}
            className="bg-slate-100 text-black text-left h-full w-full  rounded-r-lg"
            setOptions={{
              showLineNumbers: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Notepad;
