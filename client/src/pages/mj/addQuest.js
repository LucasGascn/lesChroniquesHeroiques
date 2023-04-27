import axios from 'axios';
import { useState } from 'react';

function AddQuest() {
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
    const newQuest = {
      name: questName,
      reward: questReward,
      description: questDescription,
      status: 'lock'
    };
    try {
      await axios.post('/updateAdventure/643fadc533751688af13a15e', { quest: newQuest });
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
      <p>Définissez vos quêtes</p>
      <form onSubmit={submitQuest}>
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
