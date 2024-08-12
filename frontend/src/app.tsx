// components
import Docs from "./Components/Docs/Docs";
import Notepad from "./Components/Notepad/Notepad";

// hooks
import { useState } from "preact/hooks";

export function App() {
  const ws = new WebSocket("ws://localhost:8080", []);
  const [selectedDoc, setSelectedDoc] = useState<number>(-1);

  return (
    <div className="h-screen w-screen bg-rose-200">
      <Docs setSelectedDoc={setSelectedDoc} selectedDoc={selectedDoc} />
      <Notepad ws={ws} selectedDoc={selectedDoc} />
    </div>
  );
}
