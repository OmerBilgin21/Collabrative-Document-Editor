// external
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";

export function App() {
  return (
    <div className="h-screen w-screen flex flex-col gap-12 pt-4 pb-8">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
