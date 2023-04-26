import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import FlashcardControls from "./FlashcardControls";
import Counter from "./Counter";
import { v4 as uuidv4 } from "uuid";

const FlashcardInterface = ({ flashcards, initialDisplayMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState(initialDisplayMode);
  const [currentChanging, setCurrentChanging] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (flashcards.length > 0) {
      const newCards = flashcards.map((card) => ({
        ...card,
        id: uuidv4(),
        mastered: false,
        cycled: 0,
        front: card.question,
        back: card.answer,
      }));
      setCards(shuffleArray(newCards));
    }
  }, [flashcards]);

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const calculateProgress = () => {
    const masteredCount = cards.filter((card) => card.mastered).length;
    return (masteredCount / cards.length) * 100;
  };

  const markAsMastered = () => {
    const unmasteredCards = cards.filter((card) => !(card.mastered));
    const currentId = unmasteredCards[currentIndex].id;
    const indexInCards = cards.findIndex((card) => card.id === currentId);
  
    setCards(
      cards.map((card, i) =>
        i === indexInCards ? { ...card, mastered: true } : card
      )
    );
    setCurrentChanging(true);
  };

  const cycleAgain = () => {
    const unmasteredCards = cards.filter((card) => !(card.mastered));
    const currentId = unmasteredCards[currentIndex].id;
    const indexInCards = cards.findIndex((card) => card.id === currentId);
  
    setCards(
      cards.map((card, i) =>
        i === indexInCards ? { ...card, cycled: card.cycled + 1 } : card
      )
    );
    setCurrentChanging(true);
  };

  const readyToChange = () => {
    setCurrentIndex(0);
    setCurrentChanging(false);
  }

  if (!cards || cards.length === 0) {
    return <p>No flashcards available.</p>;
  }

  if (cards.every((card) => card.mastered)) {
    return <p>All cards have been mastered!</p>;
  }

  const masteredCount = cards.filter((card) => card.mastered).length;
  const totalCount = cards.length;

  return (
    <div className="flashcard-interface">
        <Counter masteredCount={masteredCount} totalCount={totalCount} />
      <Flashcard flashcard={cards.filter((card) => !(card.mastered))[currentIndex]} mode={displayMode} readyToChangeNotifier={readyToChange} currentChangingNotifier={currentChanging} />
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      <FlashcardControls
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        markAsMastered={markAsMastered}
        cycleAgain={cycleAgain}
      />
    </div>
  );
};

export default FlashcardInterface;
