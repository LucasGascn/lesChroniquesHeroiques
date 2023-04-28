import { useState, useEffect, useRef } from "react";
import axios from "axios";
import cadenas from '../../assets/images/cadenas.png'
import cadenasOpen from '../../assets/images/cadenas-ouvert.png'
import '../../styles/gameMaster.css'

function AdventureQuests(props){
    const [quests, setQuests] = useState([]);
    const [adventure, setAdventure] = useState({})
    const userId = JSON.parse(localStorage.getItem("user")).user._id;
    const dataGet = useRef(true);
    useEffect(() => {
      if (dataGet.current){
        setQuests(props.adventure.quests)
        setAdventure(props.adventure) 
        dataGet.current=false
    }
  },[]);


    async function toggleLock(index) {
      const newAdventure = { ...adventure };
      newAdventure.quests[index].status = newAdventure.quests[index].status === "lock" ? "unlock" : "lock";
      setAdventure(newAdventure);

      const updateQuestUrl = "/updateAdventure/643fadc533751688af13a15e";
      try {
        const response = await axios.post(updateQuestUrl, {adventure : newAdventure});
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    if ( userId !== adventure.gameMaster ){
      return(
        <div>
          <h1>La liste des quêtes disponibles</h1>
          {quests.map((quest, index) => (
            adventure.quests[index].status === 'unlock' &&
            <div key={index}>
              <h2>{quest.nom} {quest.recompense}</h2>
              <p>{quest.description}</p>
            </div>
          ))}
        </div>        
      )
    } else {
      return (
        <div>
          <h1>La liste des quêtes</h1>
          {quests.map((quest, index) => (
            <div key={index}>
              <h2>{quest.nom} {quest.recompense}</h2>
              <p>{quest.description}</p>
              <button onClick={() => toggleLock(index)}>
                {adventure.quests[index].status === "unlock" ? (
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
export default AdventureQuests;
