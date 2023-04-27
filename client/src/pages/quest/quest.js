import { useState, useEffect } from "react";
import axios from "axios";
import cadenas from '../../assets/images/cadenas.png'
import cadenasOpen from '../../assets/images/cadenas-ouvert.png'
import '../../styles/gameMaster.css'

function AdventureQuests(){
    const [quests, setQuests] = useState([]);
    const [lock, setLock] = useState('none');
    const [open, setOpen] = useState('flex');
    const [adventure, setAdventure] = useState({})

    
    async function getQuest() {
      await axios.get("/getQuests/64414ea8f0c83651f0ae38c8")
        .then((res) => {
          setQuests(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function getAdventure() {
        await axios.get("/getAdventure/64414ea8f0c83651f0ae38c8")
          .then((res) => {
            setAdventure(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    useEffect(() => {
        getQuest()
        getAdventure() 
    }, []);

    async function toggleLock(index) {
      setLock(lock === 'none' ? 'flex' : 'none');
      setOpen(open === 'none' ? 'flex' : 'none');
      if(open === "flex") {
          adventure.quests[index].status = "unlock";
      }
      else {
          adventure.quests[index].status = "lock";
      }
      
      console.log(adventure.quests);
      
      const updateQuestUrl = "/updateAdventure/643fadc533751688af13a15e";
      await axios.post(updateQuestUrl, adventure)
          .then(res => console.log(res))
          .catch(error => console.log(error));
  }
    if(!adventure.gameMaster && quests.status =='open'){
        return(
            <div>
                {quests.map((quest, index) => (
                <div key={index}>
                <h2>{quest.nom} {quest.recompense}</h2>
                    <p>{quest.description}</p>
                </div>
                ))}
            </div>
                
    )}
    return (
        <>
            <h1>La liste des quêtes</h1>
            {quests.map((quest, index) => (
                <div key={index}>
                <h2>{quest.nom} {quest.recompense}</h2>
                    <p>{quest.description}</p>
                    <button onClick={() => toggleLock(index)} style={{display: open}}><img className="closeLock" src={cadenas} alt="cadenas fermé"></img></button>
                    <button onClick={() => toggleLock(index)} style={{display: lock}}><img className="openLock" src={cadenasOpen} alt="cadenas ouvert"></img></button>
                </div>
            ))}
        </>
    );
}

export default AdventureQuests;
