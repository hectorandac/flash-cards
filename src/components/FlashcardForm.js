import React, { useState, useEffect } from "react";
import jsyaml from "js-yaml";
import "./FlashcardForm.css";
import DataSetSelector from "./DataSetSelector";


const FlashcardForm = ({ setFlashcards, displayMode, setDisplayMode, isDarkMode }) => {
  const [yamlInput, setYamlInput] = useState("");
  const initialPlaceholder = "flashcards:\n  - ";

  useEffect(() => {
    setYamlInput(initialPlaceholder);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const cursorPosition = e.target.selectionStart;
      const updatedInput = yamlInput.slice(0, cursorPosition) + "\n  - " + yamlInput.slice(cursorPosition);
      setYamlInput(updatedInput);
      e.target.selectionStart = cursorPosition + 2;
      e.target.selectionEnd = cursorPosition + 2;
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedData = jsyaml.load(yamlInput);
      const formattedFlashcards = parsedData.flashcards.map((item) => {
        const propName = Object.keys(item)[0];
        const propValue = item[propName];
        return { question: propName, answer: propValue };
      });
      setFlashcards(formattedFlashcards);
    } catch (error) {
      alert("Error parsing YML: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flashcard-form ${isDarkMode ? "dark" : ""}`}>
      <DataSetSelector setFlashcards={setYamlInput} flashcards={yamlInput} />
      <label htmlFor="yamlInput">Enter questions and answers in YML format:</label>
      <textarea
        id="yamlInput"
        value={yamlInput}
        placeholder={initialPlaceholder}
        onChange={(e) => setYamlInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <label htmlFor="displayMode">Display mode:</label>
      <select
        id="displayMode"
        value={displayMode}
        onChange={(e) => setDisplayMode(e.target.value)}
      >
        <option value="question">Question first</option>
        <option value="answer">Answer first</option>
        <option value="mixed">Mixed</option>
      </select>
      <button type="submit">Start</button>
    </form>
  );
};

export default FlashcardForm;
