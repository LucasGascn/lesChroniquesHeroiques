import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Signup from "./pages/signup/signup";
import SignIn from "./pages/signin/signin";
import Logout from "./pages/logout/logout";
import Player from "./pages/player/player";
import MusicPlayer from "./pages/player/playSound";
import Adventure from "./pages/adventure/adventure";
import Lobby from "./pages/lobby/lobby";
import GameMaster from "./pages/mj/gameMaster";
import AdventurePnj from "./pages/pnj/pnj";
import AdventureQuests from "./pages/quest/quest";
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
        <Route path="/sound" element={<MusicPlayer />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/mj" element={<GameMaster />} />
        <Route path="/pnj" element={<AdventurePnj />}/>
        <Route path="/quest" element={<AdventureQuests />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;
