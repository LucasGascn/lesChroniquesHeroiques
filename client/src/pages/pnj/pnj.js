import { useState, useEffect } from "react";
import axios from "axios";
import cadenas from '../../assets/images/cadenas.png'
import cadenasOpen from '../../assets/images/cadenas-ouvert.png'
import '../../styles/gameMaster.css'
function AdventurePnj() {
  const [pnjs, setPnjs] = useState([]);
  const [lock, setLock] = useState('none');
  const [open, setOpen] = useState('flex');
  const [adventure, setAdventure] = useState({})


  async function getAdventure() {
    await axios.get("/getAdventure/64414ea8f0c83651f0ae38c8")
      .then((res) => {
        setAdventure(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
  
  async function toggleLock(index) {
    setLock(lock === 'none' ? 'flex' : 'none');
    setOpen(open === 'none' ? 'flex' : 'none');
    if(open === "flex"){ adventure.pnj[index].status = "unlock"}
    else {adventure.pnj[index].status = "lock"}
    const updateQuestUrl = "/updateAdventure/643fadc533751688af13a15e";
    await axios.post(updateQuestUrl, adventure)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    console.log(adventure.pnj[index]);
}
  useEffect(() => {
    getAdventure()
    getPnj()
  }, []);

  return (
    <>
    <h1>La liste de vos PNJ</h1>
      {pnjs.map((pnj, index) => (
        <div key={index}>
          <h2>{pnj.prenom} {pnj.nom}</h2>
          <p>{pnj.description}</p>

          <button onClick={() => toggleLock(index)} style={{display: open}}><img className="closeLock" src={cadenas} alt="cadenas fermé"></img></button>
          <button onClick={() => toggleLock(index)} style={{display: lock}}><img className="openLock" src={cadenasOpen} alt="cadenas ouvert"></img></button>
        </div>
      ))}
    </>
  );
}

export default AdventurePnj;