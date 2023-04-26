import { useState, useEffect } from "react";
import axios from "axios";
import cadenas from '../../assets/images/cadenas.png'
import cadenasOpen from '../../assets/images/cadenas-ouvert.png'
import '../../styles/gameMaster.css'
function AdventurePnj() {
  const [pnjs, setPnjs] = useState([]);
  const [lock, setLock] = useState('none');
  const [open, setOpen] = useState('flex');
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
  
  function toggleLock() {
    setLock(lock === 'none' ? 'flex' : 'none');
    setOpen(open === 'none' ? 'flex' : 'none');
}
  useEffect(() => {
    getPnj()
  }, []);

  return (
    <>
    <h1>La liste de vos PNJ</h1>
      {pnjs.map((pnj, index) => (
        <div key={index}>
          <h2>{pnj.prenom} {pnj.nom}</h2>
          <p>{pnj.description}</p>

          <button onClick={toggleLock} style={{display: open}}><img className="closeLock" src={cadenas} alt="cadenas fermé"></img></button>
          <button onClick={toggleLock} style={{display: lock}}><img className="openLock" src={cadenasOpen} alt="cadenas ouvert"></img></button>
        </div>
      ))}
    </>
  );
}

export default AdventurePnj;