import { useState } from "react";
import axios from "axios";
function AddClass(props){
    const [completeClass, setCompleteClass] = useState({
        name: '',
        stat :[]
    })
    const [className, setClassName] = useState('') 
    const [statName, setStatName] = useState('') 
    const [statBase, setStatBase] = useState('') 
    const [statMax, setStatMax] = useState('') 
    const [error, setError] = useState('');

    const submitClass = async (event) => {
        event.preventDefault();
        if (!className) {
          setError('Veuillez remplir le champ du noms de classe');
          return;
        }
        const newClass = {
            name: className,
        };
        try {
            props.adventure.classes.push(newClass)
          await axios.post(`/updateAdventure/${props.adventure._id}`, { adventure : newClass });
          console.log('Une nouvelle classe a été ajouté');
          setClassName('');
          console.log(props.adventure._id);
        } catch (error) {
            console.error("Echec d'ajout de PNJ", error);
        }
      };
      const submitStat = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        console.log(data.get('name'))
        if(!statName || !statBase || !statMax){
            setError('veuillez remplir tous les champs')
            return;
        }
        const newStat = {
            stats :
            {
                name: statName,
                value: statBase,
                max: statMax
            }
        }
        console.log(completeClass)
        const tempClass = completeClass;
        tempClass.stat.push(newStat)
        setCompleteClass(tempClass)
      }

      const submitClassName = (event) =>{
        event.preventDefault();
        if(!className){
            setError('veuillez remplir tous les champs')
            return;
        }
        const tempClass = completeClass;
        tempClass.name = className
        console.log(tempClass)
        
        setCompleteClass(tempClass)
        console.log(completeClass)
      }

    return(
    <>
      <h3>Définissez les classes</h3>
      <div className="d-flex">
      <div className="w-100 p-1">
        <form onSubmit={submitClassName}>
            Classe : <input type="text" name="nom" value={className} id="name" onChange={(e) => setClassName(e.target.value)} />
            <button type="submit">Ajouter la classe</button>

        </form>
        <form className="classes__form" onSubmit={submitStat}>
            <p>Définissez les stats des classes (Vie, Mana, force, etc...) : </p>
            Nom de la stats : <input type="text" name="statName" value={statName} onChange={(e) => setStatName(e.target.value)} />
            Valeur de base : <input type="text" name="statBase" value={statBase} onChange={(e) => setStatBase(e.target.value)} />
            Valeur maximal : <input type="text" name="statMax" value={statMax} onChange={(e) => setStatMax(e.target.value)} />
            <button type="submit">Ajouter la stats</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
      <div>
        <span>
            {completeClass.name}
        </span>
        <div>
            {completeClass.stat.map(element =>{
                <span>
                    {element.name}
                </span>
            })}
        </div>
      </div>
      </div>
    
    
    </>)
}export default AddClass;