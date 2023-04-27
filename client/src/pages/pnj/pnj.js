import { useState, useEffect } from "react";
import axios from "axios";
import cadenas from '../../assets/images/cadenas.png'
import cadenasOpen from '../../assets/images/cadenas-ouvert.png'
import '../../styles/gameMaster.css'

function AdventurePnj(){
    const [pnjs, setPnjs] = useState([]);
    const [adventure, setAdventure] = useState({})
    const userId = JSON.parse(localStorage.getItem("user")).user._id;

    async function getPnj() {
      await axios.get("/getPnjs/64414ea8f0c83651f0ae38c8")
        .then((res) => {
          console.log(res.data)
          setPnjs(res.data);
          console.log(pnjs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    async function getAdventure() {
      try {
        const response = await axios.get("/getAdventure/64414ea8f0c83651f0ae38c8")
        setAdventure(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        getPnj()
        getAdventure() 
    }, []);

    async function toggleLock(index) {
      const newAdventure = { ...adventure };
      newAdventure.pnj[index].status = newAdventure.pnj[index].status === "lock" ? "unlock" : "lock";
      setAdventure(newAdventure);

      const updatePnjUrl = "/updateAdventure/643fadc533751688af13a15e";
      try {
        const response = await axios.post(updatePnjUrl, newAdventure);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    if ( userId !== adventure.gameMaster ){
      return(
        <div>
          <h1>La liste des quêtes disponibles</h1>
          {pnjs.map((pnj, index) => (
            adventure.pnj[index].status === 'unlock' &&
            <div key={index}>
              <h2>{pnj.nom} {pnj.recompense}</h2>
              <p>{pnj.description}</p>
            </div>
          ))}
        </div>        
      )
    } else {
      return (
        <div>
          <h1>La liste des quêtes</h1>
          {pnjs.map((pnj, index) => (
            <div key={index}>
              <h2>{pnj.nom} {pnj.recompense}</h2>
              <p>{pnj.description}</p>
              <button onClick={() => toggleLock(index)}>
                {adventure.pnj[index].status === "unlock" ? (
                  <img className="openLock" src={cadenasOpen} alt="cadenas ouvert" />
                ) : (
                  <img className="closeLock" src={cadenas} alt="cadenas fermé" />
                )}
              </button>
            </div>
          ))}

        </div>
    );
}
}
export default AdventurePnj;