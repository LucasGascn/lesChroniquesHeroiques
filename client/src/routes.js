import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";
import SignIn from "./pages/signin/signin";
import Logout from "./pages/logout/logout";
import Player from "./pages/player/player";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/player" element={<Player />} />

      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;
