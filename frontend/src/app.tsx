// components
import Docs from "./Components/Docs/Docs";
import Notepad from "./Components/Notepad/Notepad";

// hooks
import { useState } from "preact/hooks";
import useSWR from "swr";

// utils
import { fetcher } from "./utils/api";

// types
import { IDocs } from "./interfaces/docs";

export function App() {
  const wss = new WebSocket("ws://localhost:8080", []);
  const [selectedDoc, setSelectedDoc] = useState<number>(1)
  const { data } = useSWR<IDocs[]>("docs", fetcher, { refreshInterval: 1000 })

  console.log('data: ', data)

  return (
    <div className="h-screen w-screen">
      <Docs data={data} setSelectedDoc={setSelectedDoc} />
      <Notepad wss={wss} selectedDoc={selectedDoc} data={data} />
    </div>
  );
}
