import { useRef, useState } from "react";
import axios from "axios";

function AddClass(props) {
  const [completeClass, setCompleteClass] = useState({
    name: "",
    stat: [],
  });
  const [statName, setStatName] = useState("");
  const [statBase, setStatBase] = useState("");
  const [statMax, setStatMax] = useState("");
  const [error, setError] = useState("");

  const testName = useRef("");

  const submitClass = async () => {
    try {
      props.adventure.classes.push(completeClass);
      await axios.post(`/updateAdventure/${props.adventure._id}`, {
        adventure: props.adventure,
      });
      console.log("Une nouvelle classe a été ajouté");
      console.log(props.adventure._id);
    } catch (error) {
      console.error("Echec d'ajout de PNJ", error);
    }
  };
  const submitStat = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("name"));
    if (!statName || !statBase || !statMax) {
      setError("veuillez remplir tous les champs");
      return;
    }
    const newStat = {
      name: statName,
      value: statBase,
      max: statMax,
    };
    const stats = [...completeClass.stat];
    stats.push(newStat);
    setCompleteClass((obj) => ({
      stat: stats,
      name: obj.name,
    }));
  };

  const submitClassName = (event) => {
    event.preventDefault();
    if (!testName.current.value) {
      setError("veuillez remplir tous les champs");
      return;
    }
    setCompleteClass((obj) => ({
      stat: obj.stat,
      name: testName.current.value,
    }));
    console.log(completeClass);
  };

  return (
    <>
      <h3>Définissez les classes</h3>
      <div className="d-flex w-100">
        <div className="w-100 p-1">
          <form onSubmit={submitClassName}>
            Classe : <input type="text" name="nom" ref={testName} id="name" />
            <button type="submit">Ajouter la classe</button>
          </form>
          <form className="classes__form" onSubmit={submitStat}>
            <p>
              Définissez les stats des classes (Vie, Mana, force, etc...) :{" "}
            </p>
            Nom de la stats :{" "}
            <input
              type="text"
              name="statName"
              value={statName}
              onChange={(e) => setStatName(e.target.value)}
            />
            Valeur de base :{" "}
            <input
              type="text"
              name="statBase"
              value={statBase}
              onChange={(e) => setStatBase(e.target.value)}
            />
            Valeur maximal :{" "}
            <input
              type="text"
              name="statMax"
              value={statMax}
              onChange={(e) => setStatMax(e.target.value)}
            />
            <button type="submit">Ajouter la stats</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
        <div className="d-flex flex-column border w-100 p-1 justify-content-between">
          <div
            className="w-100 p-1 d-flex flex-column"
            style={{ maxHeight: "240px" }}
          >
            <span className="text-center">{completeClass.name}</span>
            <div
              className="border p-2"
              style={{ overflowY: "scroll", maxHeight: "90%" }}
            >
              {completeClass.stat.map((element, index) => {
                console.log(element);
                return (
                  <div key={index}>
                    <div>{element.name}</div>
                    <div>
                      {element.value} / {element.max}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => {
              submitClass();
            }}
          >
            Ajouter la classe
          </button>
        </div>
      </div>
    </>
  );
}
export default AddClass;
