import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, remainingTime, winner, timeStopped },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  return (
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}</h2>
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      {timeStopped ? (
        <p>You stopped the timer with <strong>{remainingTime} seconds left.</strong></p>
      ) : (
        <p>Time expired. No time left.</p>
      )}
      {winner && <p>Congratulations! Winner: <strong>{winner}</strong></p>}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
