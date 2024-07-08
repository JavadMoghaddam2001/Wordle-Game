import { useEffect, useRef } from "react";

export default function ResultModal({ isWon, answer, isModal }) {
  const modalRef = useRef();
  const modalBgRef = useRef();
  useEffect(() => {
    if (isModal) {
      modalRef.current.style.display = "flex";
      modalRef.current.classList.add("modal-animation");
      modalBgRef.current.style.display = "block";
      modalBgRef.current.classList.add("modal-bg-animation");
    }
  }, [isModal]);

  return (
    <>
      <div ref={modalRef} className="modal-container">
        <div className="modal-text">
          {isWon ? (
            <>
              <span className="modal-text-okay">You Won :)</span>
              <span>Congrats!</span>
            </>
          ) : (
            <>
              <span className="modal-text-error">You Lost :(</span>
              <span>The Correct Answer was : {answer}</span>
            </>
          )}
        </div>
        <button className="modal-btn" onClick={() => window.location.reload()}>
          Play Again
        </button>
      </div>
      <div ref={modalBgRef} className="modal-bg"></div>
    </>
  );
}
