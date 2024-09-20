import Player from './components/Player.jsx';
import TimerChallenge from './components/TimeChallenge.jsx';
import './index.css'; 
import { useState } from "react";
function App() {
  const [playerName, setPlayerName] = useState("");

  return (
    <>
      <Player setPlayerName={setPlayerName}/>
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1} playerName={playerName}/>
        <TimerChallenge title="Not Easy" targetTime={3} playerName={playerName}/>
        <TimerChallenge title="Hard" targetTime={5} playerName={playerName}/>
        <TimerChallenge title="Only for pro" targetTime={10} playerName={playerName}/>
      </div>
    </>
  );
}

export default App;
