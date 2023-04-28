import { useState } from "react";

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

    let message = "vous faites un " + diceValue;
    setMessages([message, ...messages]);
    console.log(messages);
  };

  let diceList = dices.map((dice) => {
    return (
      <button
        onClick={() => {
          rollDice(dice.value);
        }}
      >
        {dice.dice}
      </button>
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
        <div></div>
      </div>
    </>
  );
};

export default DiceManager;
