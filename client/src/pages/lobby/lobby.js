import { Button } from "@mui/material";
import io, { Manager } from "socket.io-client";
import axios from "axios";
import { useEffect, useState, useRef, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import PopUpPnj from './popUpPnj'
import PopUpQuest from './popUpQuest'
import PopUpMj from "./popUpMj";

import CreateCharacterPopUp from "./createCharacterPopUp";
import CharacterInfosPopUp from "./characterInfosPopUp";
import Dialog from "@mui/material/Dialog";


export default function Lobby(props) {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const navigate = useNavigate();

  const [adventure, setAdventure] = useState({});
  const [characters, setCharacters] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUserChar, setCurrentUserChar] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user")).user._id;
  const [socket, setSocket] = useState();

  function leaveRoom() {
    axios.post(`leaveAdventure/${userId}`).then((response) => {
      socket.disconnect();
      navigate("/home");
    });
  }
  async function getAdventure(id) {
    await axios.get(`/getAdventure/${id}`).then((response) => {
      setAdventure(response.data);
    });
  }

  function JoinRoom() {
    adventure.players.push(userId);
    axios
      .post(`/joinAdventure/${id}`, { playerId: userId })
      .then((response) => {
        // console.log(response);
      });
  }

  async function getCharacters(id) {
    await axios.get(`/getPlayerByAdventure/${id}`).then((response) => {
      setCharacters(response.data.data);
      // console.log(response.data.data)

      checkUserChar(response.data.data);
    });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCharacter = (newCharacter) => {
    const characterCopy = [...characters];
    characterCopy.push(newCharacter);
    setCurrentUserChar(newCharacter);

    setCharacters(characterCopy);
  };

  useEffect(function () {
    setSocket(
      io.connect("http://localhost:5000/game", {
        query: {
          userId,
        },
      })
    );
    getAdventure(id);
    getCharacters(id);
  }, []);

  useEffect(
    function () {
      if (adventure.players) {
        JoinRoom();
      }
    },
    [adventure]
  );

  useEffect(() => {
    if (socket) {
      socket.on("roomJoined", (msg) => {
        // console.log(msg);
        for (let i = 0; i < characters.length; i++) {
          if (characters[i]._id != msg.user._id) {
            //characters.push(msg.user);
          }
        }

        // console.log(characters)
      });
      socket.on("UpdateAdventure", (msg) => {
        setAdventure(msg);
      });
      socket.on("newCharacter", (msg) => {
        setCharacters(msg);
        console.log(msg);
      });
    }
  }, [socket]);
  
  const playersList = characters.map((player) => {
    // console.log(player)
    return (
      <>
        <div
          className="col-6 mt-2 d-flex justify-content-center"
          key={player._id}
        >
          <div className="col-11 card">
            <div className="mx-1 d-flex justify-content-around">
              <span>{player.name}</span>
              <span>{player.job}</span>
            </div>
            <div className="row">
              {player.stats.map((stat) => {
                return (
                  <>
                    <span key={stat.name} className="col-5 m-1">
                      {stat.name} : {stat.value}/{stat.max}
                    </span>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  });

  function checkUserChar(chars) {
    chars.map((element) => {
      if (element.userId == userId) {
        setCurrentUserChar(element);
      }
    });
  }

  const dialogRendered = () => {
    if (!currentUserChar) {
      return (
        <CreateCharacterPopUp
          handleClose={handleClose}
          addCharacter={addCharacter}
          adventureId={adventure._id}
        ></CreateCharacterPopUp>
      );
    }

    return (
      <CharacterInfosPopUp
        handleClose={handleClose}
        character={currentUserChar}
      ></CharacterInfosPopUp>
    );
  };

  return (
    <div className="container">
      <div className="container__popup-buttons" color="primary" >
        <PopUpPnj adventure={adventure}/>
        <PopUpQuest adventure={adventure}/>
        <PopUpMj adventure={adventure}/>
      </div>
      
      <div className="row card  mt-3">
        <div className="col d-flex justify-content-between align-items-center">
          <Button onClick={() => leaveRoom()}>leave</Button>
          <span>{adventure.name}</span>
          <div>
            <Button size="lg" onClick={() => handleOpen()}>
              {currentUserChar ? "Fiche personnage" : "Créer mon personnage"}
            </Button>
          </div>
        </div>
      </div>
      <div className="row card mt-3 d-flex flex-column align-items-center">
        <span className="w-25 text-center m-1">Description</span>
        <div className="col">
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            possimus error sint! Placeat sequi perspiciatis inventore saepe
            aspernatur mollitia, minus dignissimos porro, provident doloremque
            ipsa impedit expedita pariatur nisi voluptatibus explicabo autem ex
            facere, quidem officia? Repellat velit, minima totam iste accusamus
            fugit tempora culpa deserunt veritatis sit perspiciatis
            reprehenderit distinctio vero accusantium at quidem nihil rem dicta
            eveniet? Beatae itaque distinctio eum! Rerum explicabo nemo
            voluptate sequi, neque ea! Quod, hic atque, vero quidem, molestias
            dignissimos odio nemo assumenda magnam quibusdam deserunt blanditiis
            perspiciatis consequatur ipsam ratione animi nihil dolore!
            Cupiditate possimus iste culpa maiores. Labore architecto quos
            totam.
          </span>
        </div>
      </div>
      <div className="row mt-3 d-flex justify-content-between">
        <div className="col-9 card h-50 p-2">
          <div className="row d-flex justify-content-between p-2">
            {playersList}
          </div>
        </div>
        <div className="col-3 h-50 d-flex justify-content-end p-0">
          <div className="col-11 card">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            ratione itaque eum mollitia deleniti iusto dolorum error incidunt
            maiores commodi totam possimus deserunt distinctio vitae assumenda,
            minima dicta quos. Nesciunt.
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        {dialogRendered()}
      </Dialog>
    </div>
  );
}
