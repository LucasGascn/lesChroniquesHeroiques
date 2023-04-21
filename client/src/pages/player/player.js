import { useState } from "react";
import MusicPlayer from "./playSound";
const FormPj = [
    {
      inputName: "Dextérité",
      value: 0,
      inputId: "id1",
      buttonId: "1",
      isChanged: false
    },
    {
      inputName: "Force",
      value: 0,
      inputId: "id2",
      buttonId: "2",
      isChanged: false
    },
    {
      inputName: "Perception",
      value: 0,
      inputId: "id3",
      buttonId: "3",
      isChanged: false
    },
    {
      inputName: "Intelligence",
      value: 0,
      inputId: "id4",
      buttonId: "4",
      isChanged: false
    },
    {
      inputName: "Social",
      value: 0,
      inputId: "id5",
      buttonId: "5",
      isChanged: false
    },
  ];
  
  function Player() {
    const [formPj, setFormPj] = useState(FormPj);
    
    const handleInputChange = (event, inputId) => {
      const inputValue = event.target.value;
      const updatedFormPj = formPj.map(fpj => {
        if(fpj.inputId === inputId) {
          return { ...fpj, value: inputValue, isChanged: true }
        }
        return fpj;
      });
      setFormPj(updatedFormPj);
    };
  
    const getValue = (event, buttonId) => {
      event.preventDefault();
      const fpj = formPj.find(fpj => fpj.buttonId === buttonId);
      console.log(fpj.value + fpj.isChanged);
    }
    const getAllValue = (event) => {
        event.preventDefault();
        const changedFields = formPj.filter(fpj => fpj.isChanged);
        changedFields.forEach(fpj => console.log(fpj.value + fpj.isChanged));
      };
  
    const FPJ = formPj.map((FPJ) => (
      <div key={FPJ.inputId}>
        <label htmlFor={FPJ.inputId}>{FPJ.inputName}:</label>
        <input
          type="text"
          id={FPJ.inputId}
          name={FPJ.inputName}
          value={FPJ.value}
          onChange={(event) => handleInputChange(event, FPJ.inputId)}
        />
        <button id={FPJ.buttonId} onClick={(event) => getValue(event, FPJ.buttonId)}>ok</button>
      </div>
    ));
  
    return (
      <div>
        <form>{FPJ}
            <button onClick={getAllValue}>editAll</button>
        </form>

        <MusicPlayer />
      </div>
    );
  }
export default Player;  