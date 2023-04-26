import axios from 'axios';
import { useState } from 'react';


function AddPnj() {
  const [pnjName, setPnjName] = useState('');
  const [pnjSurname, setPnjSurname] = useState('');
  const [pnjDescription, setPnjDescription] = useState('');
  const submitMj = async (event) => {
    event.preventDefault();
    const newPnj = {
      name: pnjName,
      surname: pnjSurname,
      description: pnjDescription
    };
    try {
      await axios.post(`/updateAdventure/643fadc533751688af13a15e`, { pnj: newPnj });
      console.log('Un nouveau PNJ a été ajouté');
      setPnjName('');
      setPnjSurname('');
      setPnjDescription('');
    } catch (error) {
        console.error("Echec d'ajout de PNJ", error);
    }
  };

  return (
    <>
      <p>Définissez votre PNJ</p>
      <form onSubmit={submitMj}>
        Nom : <input type="text" name="pnjName" value={pnjName} onChange={(e) => setPnjName(e.target.value)} />
        Prénom : <input type="text" name="pnjSurname" value={pnjSurname} onChange={(e) => setPnjSurname(e.target.value)} />
        Description : <input type="text" name="pnjDescription" value={pnjDescription} onChange={(e) => setPnjDescription(e.target.value)} />
        <button type="submit">Ajouter PNJ</button>
      </form>
    </>
  );
}

export default AddPnj;
