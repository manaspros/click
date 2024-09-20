import { useState, useEffect, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimeChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(targetTime);

  useEffect(() => {
    if (timerStarted) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);

        if (prevTime === 0) {
          clearInterval(intervalId);
          setTimerExpired(true);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timerStarted, targetTime]);

  function handleStart() {
    if (!timerStarted) {
      timer.current = setTimeout(() => {
        setTimerExpired(true);
        dialog.current.showModal();
      }, targetTime * 1000);

      setTimerStarted(true);
      setRemainingTime(targetTime);
    }
  }

  function handleStop() {
    if (timerStarted) {
      clearTimeout(timer.current);
      setTimerStarted(false);
    }
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost</p>}
      <p className="challenge-time">
        {remainingTime} seconds{remainingTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? 'Stop' : 'Start'} Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
    </>
  );
}