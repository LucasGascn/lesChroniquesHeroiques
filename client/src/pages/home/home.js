// import Save from "./save";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import AdventurePopUp from "./adventurePopUp";

const listAventures = [{
    name: "Aventure1",
    date: "05/02",
    character: "Ponchek Entartai",
  },
  {
    name: "Aventure2",
    date: "07/17",
    character: "Ambrer Nodule",
  },
  {
    name: "Aventure3",
    date: "07/17",
    character: "Fylk Clabaude",
  },
];

const Home = ({ ...props }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const userJson = JSON.parse(localStorage.getItem("user"));
  let userId;
  if (userJson) {
    userId = userJson.user._id;
  } else {
    navigate("/signin");
  }

  const [continueAdv, setContinueAdv] = useState([]);
  const [joinAdv, setJoinAdv] = useState([]);
  const getAdventures = async () => {
    await axios.get("/getAdventures").then((response) => {
      const adventure = response.data;

      setContinueAdv(adventure.filter((adv) => adv.players.includes(userId)));
      const joinAdvCopy = adventure.filter(
        (adv) => !adv.players.includes(userId)
      );
      joinAdvCopy.forEach((adv) => {
        if (adv.players.length >= adv.size) {
          joinAdvCopy.splice(joinAdvCopy.indexOf(adv), 1);
        }
      });
      setJoinAdv(joinAdvCopy);
    });
  };

  const addAdventure = (newAdv) => {
    const advCopy = [...joinAdv];
    advCopy.push(newAdv);
    setJoinAdv(advCopy);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function navigateToLobby(id) {
    navigate(`/lobby?id=${id}`);
  }

  useEffect(function () {
    getAdventures();
  }, []);
  return (
    <div className="home__content">
      <p id="home__title">Lancez vous dans une nouvelle aventure !</p>
      <div className="home__start">
        <div>
          <Button size="lg" onClick={() => handleOpen()}>
            Créer
          </Button>
        </div>
        <div className="home__saves d-flex justify-content-around w-100">
          <div
            style={{ border: "none", boxShadow: "none", width: "45%" }}
            bg="transparent"
          >
            <div className="home__save__card-header text-center">Continuer</div>
            <div className="home__save__card-body">
              <div className="home__aventures">
                {continueAdv.map((arg, index) => (
                  <>
                    <div
                      onClick={() => {
                        navigateToLobby(arg._id);
                      }}
                      key={arg._id}
                      style={{ cursor: "pointer" }}
                    >
                      {arg.name}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{ border: "none", boxShadow: "none", width: "45%" }}
            bg="transparent"
          >
            <div className="home__save__card-header text-center">Rejoindre</div>
            <div className="home__save__card-body">
              <div className="home__aventures">
                {joinAdv.map((arg, index) => (
                  <>
                    <div
                      onClick={() => {
                        navigateToLobby(arg._id);
                      }}
                      key={arg._id}
                      style={{ cursor: "pointer" }}
                    >
                      {arg.name}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home__desc">
        <p id="home__desc__1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
          ullamcorper velit. Quisque varius justo vel tempus tincidunt. Sed at
          ligula eu quam pulvinar semper. Etiam luctus, ipsum venenatis bibendum
          consectetur, leo dui hendrerit neque, sagittis volutpat risus neque et
          metus. Donec malesuada fermentum tellus non faucibus. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Nunc non fermentum mauris. Cras eget convallis urna.
          Aliquam erat volutpat. Phasellus suscipit ornare nisi.
        </p>
        <p id="home__desc__2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
          ullamcorper velit. Quisque varius justo vel tempus tincidunt. Sed at
          ligula eu quam pulvinar semper. Etiam luctus, ipsum venenatis bibendum
          consectetur, leo dui hendrerit neque, sagittis volutpat risus neque et
          metus. Donec malesuada fermentum tellus non faucibus. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Nunc non fermentum mauris. Cras eget convallis urna.
          Aliquam erat volutpat. Phasellus suscipit ornare nisi.
        </p>
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <AdventurePopUp
          handleClose={handleClose}
          addAdventure={addAdventure}
        ></AdventurePopUp>
      </Dialog>
    </div>
)};
export default Home