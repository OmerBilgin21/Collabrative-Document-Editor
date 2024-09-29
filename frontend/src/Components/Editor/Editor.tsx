import Docs from "../Docs/Docs";
import Notepad from "../Notepad/Notepad";
import { useNavigate } from "react-router-dom";
import { useEffect } from "preact/hooks";
import { useAuth } from "../../context/AuthContext";

const Editor = () => {
  const ws = new WebSocket("ws://localhost:8080", []);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col gap-y-16">
      <Docs />
      <Notepad ws={ws} />
    </div>
  );
};

export default Editor;
