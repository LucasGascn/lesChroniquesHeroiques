import { useState } from "react";
import Button from 'react-bootstrap/Button'

const DiceManager = () => {
  let dices = [
    { dice: "D4", value: 4 },
    { dice: "D6", value: 6 },
    { dice: "D8", value: 8 },
    { dice: "D10", value: 10 },
    { dice: "D12", value: 12 },
    { dice: "D20", value: 20 },
  ];

  const [messages, setMessages] = useState([]);

  const rollDice = (value) => {
    let min = 1;
    let max = value;
    let diceValue = Math.random() * (max - min) + min;
    diceValue = Math.round(diceValue);

    let message = "Vous lancez un D" + max + " vous faites un " + diceValue;
    setMessages([message, ...messages]);
    console.log(messages);
  };

  let diceList = dices.map((dice) => {
    return (
      <Button
        
        onClick={() => {
          rollDice(dice.value);
        }}
      >
        <span className="diceBtnText">
          {dice.dice}
        </span>
      </Button>
    );
  });

  return (
    <>
      <div className="dtContainer">
        <div className="diceHolder">{diceList}</div>
        <div className="diceTextBox">
          {messages.map((message) => {
            return <p>{message}</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default DiceManager;
