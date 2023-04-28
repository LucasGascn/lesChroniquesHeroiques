import { useState } from "react";
import axios from "axios";
function AddClass(props){
    
    const [className, setClassName] = useState('') 
    const [statName, setStatName] = useState('') 
    const [statBase, setStatBase] = useState('') 
    const [statMax, setStatMax] = useState('') 
    const [error, setError] = useState('');

    const submitClass = async (event) => {
        event.preventDefault();
        if (!className || !statName || !statBase || !statMax) {
          setError('Veuillez remplir tous les champs');
          return;
        }
        const newClass = { nomClasse: className,nomState: statName,valeurBase: statBase,statMax: statMax};
        try {
          await axios.post(`/updateAdventure/${props.adventure._id}`, { classe: newClass });
          console.log('Une nouvelle classe a été ajouté');
          setClassName('');
          setStatName('');
          setStatBase('');
          setStatMax('');
          console.log(props.adventure._id);
        } catch (error) {
            console.error("Echec d'ajout de PNJ", error);
        }
      };


    return(
    <>
      <p>Définissez les classes</p>
      <form onSubmit={submitClass}>
        Classe : <input type="text" name="nom" value={className} onChange={(e) => setClassName(e.target.value)} />
        <p>définissez les stats des classes (Vie, Mana, force, etc...)</p>
        Nom de la stats : <input type="text" name="statName" value={statName} onChange={(e) => setStatName(e.target.value)} />

        Valeur de base : <input type="text" name="statBase" value={statBase} onChange={(e) => setStatBase(e.target.value)} />
        Valeur maximal : <input type="text" name="statMax" value={statMax} onChange={(e) => setStatMax(e.target.value)} />
        <button type="submit">Ajouter la stats</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

    </form>

    </>)
}export default AddClass;