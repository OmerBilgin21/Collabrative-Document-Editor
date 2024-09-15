import { render } from "preact";
import { App } from "./app.tsx";
import "./index.css";
import DocContextProvider from "./context/DocContextProvider.tsx";
import AuthContextProvider from "./context/AuthProvider.tsx";

render(
  <AuthContextProvider>
    <DocContextProvider>
      <App />
    </DocContextProvider>
  </AuthContextProvider>,
  document.getElementById("app")!,
);
