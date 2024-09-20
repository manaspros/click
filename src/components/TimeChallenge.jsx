import { useState, useEffect, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimeChallenge({ title, targetTime, playerName }) {
  const timer = useRef();
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(targetTime);
  const [winner, setWinner] = useState(null);
  const [timeStopped, setTimeStopped] = useState(false); // New state for checking if the timer was stopped early

  useEffect(() => {
    if (timerStarted && remainingTime > -0.1) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }

    if (remainingTime === 0) {
      setTimerExpired(true);
      dialog.current.open();
      setWinner(playerName); // Declare the player as the winner when time reaches 0
      setTimerStarted(false);
    }
  }, [timerStarted, remainingTime, playerName]);

  function handleStart() {
    if (!timerStarted) {
      setTimerStarted(true);
      setRemainingTime(targetTime);
      setTimerExpired(false);
      setTimeStopped(false); // Reset when restarting the timer
    }
  }

  function handleStop() {
    if (timerStarted) {
      if (remainingTime === 0) {
        setWinner(playerName); // Declare winner if the timer reaches 0
      } else {
        setTimeStopped(true); // Mark as stopped before the time reached 0
      }
      setTimerStarted(false);
      dialog.current.open(); // Open the modal when stopping
    }
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={remainingTime}
        result={timerExpired ? "lost" : "stopped"}
        winner={winner}
        timeStopped={timeStopped} // Pass whether the timer was stopped early
      />
      <section className="challenge">
        <h2>{title}</h2>
        {timerExpired && <p>You lost</p>}
        <p className="challenge-time">
          {remainingTime} second{remainingTime !== 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
        {winner && (
          <div className="winner-dropdown">
            <p>Winner: {winner}</p>
          </div>
        )}
      </section>
    </>
  );
}
