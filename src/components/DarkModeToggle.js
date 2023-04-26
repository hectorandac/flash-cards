import React from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
    return (
        <button
            className={`dark-mode-toggle ${darkMode ? 'dark-mode' : ''}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
        >
            <span className="toggle-switch"><span>{darkMode ? '☀️' : '🌚'}</span></span>
            
        </button>
    );
};
export default DarkModeToggle;
