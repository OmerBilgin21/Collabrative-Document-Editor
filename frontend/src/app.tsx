// components
import Docs from "./Components/Docs/Docs";
import Notepad from "./Components/Notepad/Notepad";

export function App() {
  const ws = new WebSocket("ws://localhost:8080", []);

  return (
    <div className="h-screen w-screen flex flex-col gap-12 pt-4 pb-8">
      <Docs />
      <Notepad ws={ws} />
    </div>
  );
}
