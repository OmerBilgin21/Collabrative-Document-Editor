// hooks
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import { useEffect, useState, useRef } from "preact/hooks";

// utils
import { mergeString } from "../../utils/resolver";

// types
import { IDocVersion } from "../../interfaces/docs";
import VersionList from "../VersionList/VersionList";

const ERROR_CODE = import.meta.env.VITE_ERROR_CODE;

interface IProps {
  ws: WebSocket;
  selectedDoc: number;
}

const Notepad = ({ ws, selectedDoc }: IProps) => {
  const [text, setText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { data }: { data: IDocVersion } = useSWR(
    `/version/${selectedDoc}/latest`,
    fetcher,
    {
      refreshInterval: 2000,
    },
  );

  useEffect(() => {
    // I don't sync one character differences between clients
    // because if we do so, that makes the writing
    // really cumbersome
    if (
      data &&
      data.text !== text &&
      Math.sqrt(data.text.length - text.length) !== 1
    ) {
      setText(data.text);
    }
  }, [data]);

  useEffect(() => {
    if (ws.readyState && selectedDoc !== -1) {
      ws.send(JSON.stringify({ doc_id: selectedDoc, text }));
    }
  }, [text]);

  const handlePageUnload = (_: BeforeUnloadEvent) => {
    if (selectedDoc !== -1) {
      console.log("text: ", text);
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
    // backend is sending a preset uuid in case of error
    if (e.data === ERROR_CODE) {
      window.alert(
        "Connection was lost, please reload the page.\nYou might want to secure your text as well!",
      );
      return;
    }

    if (e.data !== text) {
      setText(mergeString(e.data, text));
    }
  };

  // The editor doesn't make sense if there's nothing to edit.
  // -Omer
  if (selectedDoc === -1) {
    return <></>;
  }

  return (
    <div className="h-full min-w-full ml-0 m:ml-6 lg:ml-10 xl:ml-16">
      <div className="h-full flex w-3/5 shadow-xl">
        <div className="w-36 h-full">
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
              setText(target.value);
            }}
            value={text}
          />
        </div>
      </div>
    </div>
  );
};

export default Notepad;
