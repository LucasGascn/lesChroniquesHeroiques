import axios from 'axios';
import { useState } from 'react';

function AddQuest() {
  const [questName, setQuestName] = useState('');
  const [questReward, setQuestReward] = useState('');
  const [questDescription, setQuestDescription] = useState('');

  const submitQuest = async (event) => {
    event.preventDefault();
    const newQuest = {
      name: questName,
      reward: questReward,
      description: questDescription,
      status: 'lock'
    };
    try {
      await axios.post('/updateAdventure/643fadc533751688af13a15e', {quest: newQuest });
    console.log('Une nouvelle quête a été ajoutée');
      // réinitialiser les champs de formulaire
      setQuestName('');
      setQuestReward('');
      setQuestDescription('');

    } catch (error) {
      console.error("Echec d'ajout de quête", error);
    }
  };

  return (
    <>
      <p>Définissez vos quêtes</p>
      <form onSubmit={submitQuest}>
        Nom : <input type="text" name="questName" value={questName} onChange={(e) => setQuestName(e.target.value)} />
        Récompense : <input type="text" name="questReward" value={questReward} onChange={(e) => setQuestReward(e.target.value)} />
        Description : <input type="text" name="questDescription" value={questDescription} onChange={(e) => setQuestDescription(e.target.value)} />
        <button type="submit">Ajouter Quête</button>
      </form>
    </>
  );
}

export default AddQuest;
