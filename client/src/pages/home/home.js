

import Button from 'react-bootstrap/Button';

import Description from "./description";
import Image from 'react-bootstrap/Image';
import Table from '../../assets/images/table.png'
import Adventurer from '../../assets/images/wizard.png'
import MJ from '../../assets/images/mj-icon.png'
import Univers from '../../assets/images/fantasy.png'
import Bulle from './bulles'
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import AdventurePopUp from "./adventurePopUp";

const bulles = [
    {
        name: "univers",
        image: Univers,
        text: "L'univers",
        content: "Votre personnage progresse dans un univers dépendant de l'imaginaire du maître de jeu. Il peut être issu de différentes périodes ou inspirés de multiples ouvrages construisant son Histoire et ses habitants fantasmagoriques. De la science fiction au lovecraft en passant par les croisades, vos héros seront démenés à la découverte des recoins de ces mondes chimériques."
    },
    {
        name: 'aventurier',
        image: Adventurer,
        text: "L'aventurier",
        content: "C’est à vous d’interpréter votre aventurier, d’interagir comme si vous étiez à sa place et de décider librement de ses actions. Choisir votre Personnage est donc un moment-clé. Vous allez être l’un des héros de l’histoire qui sera racontée. Alors faites le bon choix !"
    },
    {
        name: "mj",
        image: MJ,
        text: "Le maître du jeu",
        content: "Le MJ a un rôle central dans le JDR. Il en a même plusieurs : scénariste (il prépare le scénario), conteur (il raconte l’histoire et décrit les situations), acteur (il incarne les personnages que les PJ ne jouent pas), et même arbitre si besoin (c’est à lui de trancher en cas de litige sur les règles).",
    }
]

const description = [
    {
        direction: 'right',
        content: "Le JDR est un jeu de société collaboratif dans lequel les joueurs travaillent ensemble pour créer une histoire. Les joueurs créent des personnages en utilisant des fiches de personnages qui décrivent les compétences, les caractéristiques et les traits de leur personnage. Le maître du jeu crée un monde imaginaire et décrit les événements qui se produisent dans cet univers. Les joueurs interagissent avec cet univers en prenant des décisions et en effectuant des actions qui sont résolues en utilisant des dés."
    },
    {
        direction: 'left',
        content: "Le maître du jeu est responsable de créer des scénarios, de décrire les lieux, les personnages avatar et les événements qui se produisent dans le monde imaginaire. Le maître du jeu joue également les personnages non-joueurs qui interagissent avec les personnages des joueurs. Les joueurs peuvent interagir avec l'environnement, résoudre des énigmes, combattre des ennemis, négocier avec des personnages non-joueurs et accomplir des quêtes. Le JDR est un jeu très flexible qui permet aux joueurs d'utiliser leur imagination pour créer des histoires uniques."
    }
]

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
        <div className="home__start__buttons">
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
            {description.map((arg, index) => <Description key={`description-${index}`} {...arg}></Description>)}
        </div>
        <div className="home__grid-container">
            <div className="home__table">
                <Image className="home__table__image" fluid src={Table}></Image>
                {bulles.map((arg, index) => <Bulle key={`bulle-${index}`} {...arg}></Bulle>)}

            </div>
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
