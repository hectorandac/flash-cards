import React, { useState } from "react";
import "./App.css";
import FlashcardForm from "./components/FlashcardForm";
import FlashcardInterface from "./components/FlashcardInterface";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [flashcards, setFlashcards] = useState(null);
  const [displayMode, setDisplayMode] = useState("mixed");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {flashcards ? (
        <FlashcardInterface flashcards={flashcards} initialDisplayMode={displayMode} />
      ) : (
        <FlashcardForm setFlashcards={setFlashcards} displayMode={displayMode} setDisplayMode={setDisplayMode} isDarkMode={darkMode} />
      )}
    </div>
  );
}

export default App;
