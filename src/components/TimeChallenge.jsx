import { useState, useEffect, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimeChallenge({ title, targetTime, playerName }) {
  const timer = useRef();
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(targetTime * 1000); // convert targetTime to milliseconds
  const [winner, setWinner] = useState(null);
  const [timeStopped, setTimeStopped] = useState(false);
  const [showLossMessage, setShowLossMessage] = useState(false);

  useEffect(() => {
    if (timerStarted && remainingTime > 0) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 10); // Decrease every 10ms
      }, 10); // Update the timer every 10 milliseconds

      return () => clearInterval(intervalId);
    }

    if (remainingTime <= 0 && timerStarted) {
      // Timer expired
      setTimerExpired(true);
      setTimerStarted(false);
      setRemainingTime(0); // Ensure it's set to exactly 0
      setWinner(playerName);

      // Delay the loss message appearance
      setTimeout(() => {
        setShowLossMessage(true);
        dialog.current.open();
      }, 500); // Show loss message after 0.5 seconds
    }
  }, [timerStarted, remainingTime, playerName]);

  function handleStart() {
    if (!timerStarted) {
      setTimerStarted(true);
      setRemainingTime(targetTime * 1000); // Reset the timer to the target time (in milliseconds)
      setTimerExpired(false);
      setTimeStopped(false);
      setShowLossMessage(false);
    }
  }

  function handleStop() {
    if (timerStarted) {
      clearTimeout(timer.current);
      setTimerStarted(false);
      setTimeStopped(true);
      dialog.current.open();
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
        timeStopped={timeStopped}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {showLossMessage && <p>You lost</p>}
        <p className="challenge-time">
          {remainingTime / 1000} second{remainingTime !== 1000 ? "s" : ""} ({remainingTime} milliseconds)
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
