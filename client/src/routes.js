import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;
