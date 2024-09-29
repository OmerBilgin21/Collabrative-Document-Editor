// external
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import Editor from "./Components/Editor/Editor";

export function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col gap-12 pt-4 pb-8 relative">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="docs" element={<Editor />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <footer className="w-full h-7 bg-gray-800 text-center text-white absolute bottom-0">
        <p>© 2024 DocuFlow. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
