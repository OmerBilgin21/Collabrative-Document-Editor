// hooks
import { useEffect, useState, useRef } from "preact/hooks";
import useAxios from "../../utils/api";

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
  const [data, setData] = useState<IDocVersion>();
  const notepadRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const versionData = await useAxios(
        `/version/${selectedDoc}/latest`,
        "get",
      );
      if (versionData) {
        setData(versionData as unknown as IDocVersion);
      }
    };
    if (data) {
      setText(data.text);
    }
    fetcher();
  }, [selectedDoc]);

  useEffect(() => {
    if (data) {
      setText(data.text);
    }
  }, [data]);

  // keep track of the changes on the db but
  // keep it at 5 second diffs so the records
  // for the changes does not explode
  // we immediately record changes on page unload anyways
  useEffect(() => {
    const recordTimeout = setTimeout(() => {
      if (ws.readyState && selectedDoc !== -1) {
        ws.send(JSON.stringify({ doc_id: selectedDoc, text }));
      }
    }, 5000);
    return () => clearTimeout(recordTimeout);
  }, [text]);

  const handlePageUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();

    // we can not use the text value on below
    // that state is lost on reload or an attempt at closing the browser
    // but the ref value is preserved
    if (textAreaRef.current && selectedDoc !== -1)
      ws.send(
        JSON.stringify({
          doc_id: selectedDoc,
          text: textAreaRef.current.value,
        }),
      );
  };

  useEffect(() => {
    if (notepadRef.current) {
      window.addEventListener("beforeunload", handlePageUnload);
    }
    return () => window.removeEventListener("beforeunload", handlePageUnload);
  }, []);

  ws.onmessage = (e) => {
    // backend is sending a preset uuid in case of error
    if (e.data === ERROR_CODE) {
      window.alert(
        "Connection was lost, please reload the page.\nYou might want to secure your text as well!",
      );
    }

    if (e.data !== text && text.indexOf(e.data)) {
      setText(mergeString(e.data, text));
    }
  };

  if (selectedDoc === -1) {
    return <></>;
  }

  return (
    <div className="h-[80%] min-w-full bg-rose-200" ref={notepadRef}>
      <div className="h-[90%]">
        <div className="flex gap-8 h-full w-full bg-rose-200 px-4">
          <div className="w-[23%] h-full rounded-lg bg-gray-400">
            <VersionList setText={setText} id={selectedDoc} />
          </div>
          <div className="h-full w-[60%]">
            <textarea
              ref={textAreaRef}
              className="bg-cyan-200 text-black h-full w-full px-4 rounded-lg "
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
    </div>
  );
};

export default Notepad;
