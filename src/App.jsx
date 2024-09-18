import Player from './components/Player.jsx';
import TimerChallenge from './components/TimeChallenge.jsx';
import './index.css'; 
function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1}/>
        <TimerChallenge title="Not Easy" targetTime={3}/>
        <TimerChallenge title="Hard" targetTime={5}/>
        <TimerChallenge title="Only for pro" targetTime={10}/>
      </div>
    </>
  );
}

export default App;
