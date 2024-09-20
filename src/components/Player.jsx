import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef(); // used as on click it will reset if used state
  const [enteredPlayerName, setEnteredPlayerName] = useState("");

  function handleClick(event) {
    const enteredName = playerName.current.value.trim();

    if (enteredName.length >= 3 && enteredName.match(/^[a-zA-Z ]+$/)) {
      setEnteredPlayerName(enteredName);
      playerName.current.value = "";
    } else {
      alert("Please enter a valid name with at least 3 characters and no special characters.");
    }
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName || "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" placeholder="Enter your name" />
        <button onClick={handleClick} >Set Name</button>
      </p>
    </section>
  );
}