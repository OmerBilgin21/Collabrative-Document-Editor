import { render } from "preact";
import { App } from "./app.tsx";
import "./index.css";
import DocContextProvider from "./context/DocContextProvider.tsx";

render(
  <DocContextProvider>
    <App />
  </DocContextProvider>,
  document.getElementById("app")!,
);
