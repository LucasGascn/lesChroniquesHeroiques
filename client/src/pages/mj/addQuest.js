import axios from 'axios';
import { useState } from 'react';



function AddQuest(props) {
  const [questName, setQuestName] = useState('');
  const [questReward, setQuestReward] = useState('');
  const [questDescription, setQuestDescription] = useState('');
  const [error, setError] = useState('');

  const submitQuest = async (event) => {
    event.preventDefault();
    if (!questName || !questReward || !questDescription) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    console.log(props.adventure._id);

    const newQuest = {
      nom: questName,
      recompense: questReward,
      description: questDescription,
      status: 'lock'
    };
    try {
      props.adventure.quests.push(newQuest)
      await axios.post(`/updateAdventure/`+ props.adventure._id, { adventure: props.adventure });
      console.log('Une nouvelle quête a été ajoutée');
      // réinitialiser les champs de formulaire
      setQuestName('');
      setQuestReward('');
      setQuestDescription('');
      setError('');

    } catch (error) {
      console.error("Echec d'ajout de quête", error);
    }
  };

  return (
    <>
      <h3>Définissez vos quêtes</h3>
      <form onSubmit={submitQuest} style={{width:'21vw'}}>
        Nom :{' '}
        <input type="text" name="questName" value={questName} onChange={(e) => setQuestName(e.target.value)} />
        Récompense :{' '}
        <input type="text" name="questReward" value={questReward} onChange={(e) => setQuestReward(e.target.value)} />
        Description :{' '}
        <input type="text" name="questDescription" value={questDescription} onChange={(e) => setQuestDescription(e.target.value)} />
        <button type="submit">Ajouter Quête</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </form>
    </>
  );
}

export default AddQuest;
