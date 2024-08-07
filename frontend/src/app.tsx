// components
import Docs from "./Components/Docs/Docs";
import Notepad from "./Components/Notepad/Notepad";

// hooks
import { useState } from "preact/hooks";

export function App() {
  const ws = new WebSocket("ws://localhost:8080", []);
  const [selectedDoc, setSelectedDoc] = useState<number>(1);
  console.log("selectedDoc: ", selectedDoc);
  return (
    <div className="h-screen w-screen">
      <Docs setSelectedDoc={setSelectedDoc} selectedDoc={selectedDoc} />
      <Notepad ws={ws} selectedDoc={selectedDoc} />
    </div>
  );
}
