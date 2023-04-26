import React from "react";

const FlashcardControls = ({
  displayMode,
  setDisplayMode,
  markAsMastered,
  cycleAgain,
}) => {
  return (
    <div className="flashcard-controls">
      <button onClick={markAsMastered}>Mastered</button>
      <button onClick={cycleAgain}>Again</button>
    </div>
  );
};

export default FlashcardControls;
