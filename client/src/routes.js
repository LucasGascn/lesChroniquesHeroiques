import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";
import SignIn from "./pages/signin/signin";
import Logout from "./pages/logout/logout";
import Player from "./pages/player/player";
import Game from "./pages/inGame/game";
import MusicPlayer from "./pages/player/playSound";
import GameMaster from "./pages/MJ/gameMaster";
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
        <Route path="/game" element={<Game />} />
        <Route path="/sound" element={<MusicPlayer />} />
        <Route path='/mj' element={<GameMaster />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;
