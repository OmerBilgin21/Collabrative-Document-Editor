import Docs from "../Docs/Docs";
import Notepad from "../Notepad/Notepad";
import { useNavigate } from "react-router-dom";
import { useEffect } from "preact/hooks";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const ws = new WebSocket("ws://localhost:8080", []);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated at Home: ", isAuthenticated);

  useEffect(() => {
    console.log("isAuthenticated at Home: ", isAuthenticated);
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Docs />
      <Notepad ws={ws} />
    </>
  );
};

export default Home;
