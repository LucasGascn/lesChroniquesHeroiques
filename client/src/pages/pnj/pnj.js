import { useState, useEffect, useRef } from "react";
import axios from "axios";
import cadenas from '../../assets/images/cadenas.png'
import cadenasOpen from '../../assets/images/cadenas-ouvert.png'
import '../../styles/gameMaster.css'

function AdventurePnj(props){
    const [pnjs, setPnjs] = useState([]);
    const [adventure, setAdventure] = useState({})
    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    const dataGet = useRef(true);
    useEffect(() => {
        if (dataGet.current){
          setPnjs(props.adventure.pnj)
          setAdventure(props.adventure)
          dataGet.current=false
        }
    }, []);

    async function toggleLock(index) {
      const newAdventure = { ...adventure };
      newAdventure.pnj[index].status = newAdventure.pnj[index].status === "lock" ? "unlock" : "lock";
      console.log(newAdventure.pnj[index].status);
      setAdventure(newAdventure);

      try {
        await axios.post(`/updateAdventure/${props.adventure._id}`, { adventure: adventure });

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