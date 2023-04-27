import axios from 'axios';
import { useState } from 'react';


function AddPnj() {
  const [pnjName, setPnjName] = useState('');
  const [pnjSurname, setPnjSurname] = useState('');
  const [pnjDescription, setPnjDescription] = useState('');
  const [error, setError] = useState('');

  const submitMj = async (event) => {
    event.preventDefault();
    if (!pnjName || !pnjSurname || !pnjDescription) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    const newPnj = { nom: pnjName,prenom: pnjSurname,description: pnjDescription,status: 'lock'};
    try {
      await axios.post(`/updateAdventure/64414ea8f0c83651f0ae38c8`, { pnj: newPnj });
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
        Nom : <input type="text" name="nom" value={pnjName} onChange={(e) => setPnjName(e.target.value)} />
        Prénom : <input type="text" name="prenom" value={pnjSurname} onChange={(e) => setPnjSurname(e.target.value)} />
        Description : <input type="text" name="description" value={pnjDescription} onChange={(e) => setPnjDescription(e.target.value)} />
        <button type="submit">Ajouter PNJ</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </form>
    </>
  );
}

export default AddPnj;
