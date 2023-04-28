import axios from 'axios';
import { useState } from 'react';



function AddPnj(props) {
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
      props.adventure.pnj.push(newPnj)
      await axios.post(`/updateAdventure/${props.adventure._id}`, { adventure: props.adventure });
      console.log('Un nouveau PNJ a été ajouté');
      setPnjName('');
      setPnjSurname('');
      setPnjDescription('');
      console.log(props.adventure._id);

    } catch (error) {
        console.error("Echec d'ajout de PNJ", error);
    }
  };

  return <>
      <h3>Définissez votre PNJ</h3>
      <form onSubmit={submitMj} style={{width:'21vw'}}>
        Nom : <input type="text" name="nom" value={pnjName} onChange={(e) => setPnjName(e.target.value)} />
        Prénom : <input type="text" name="prenom" value={pnjSurname} onChange={(e) => setPnjSurname(e.target.value)} />
        Description : <input type="text" name="description" value={pnjDescription} onChange={(e) => setPnjDescription(e.target.value)} />
        <button type="submit">Ajouter PNJ</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </form>
    </>
}

export default AddPnj;
