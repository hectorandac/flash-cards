import React, { useEffect, useState } from "react";
import "./Flashcard.css";

const Flashcard = ({ flashcard, mode, readyToChangeNotifier, currentChangingNotifier }) => {
    const [showQuestion, setShowQuestion] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        if (mode === "answer") {
            setShowQuestion(false);
        } else if (mode === "mixed") {
            if (Math.random() > 0.5) {
                setShowQuestion(false);
            } else {
                setShowQuestion(true);
            }
        } else {
            setShowQuestion(true);
        }
        setTimeout(() => {
            setReveal(true);
        }, 1000)
    }, [flashcard, mode]);

    useEffect(() => {
        if (currentChangingNotifier) {
            setReveal(false);
            setTimeout(() => {
                readyToChangeNotifier()
            }, 600)
        }
    }, [currentChangingNotifier, readyToChangeNotifier])

    const handleClick = () => {
        setShowQuestion(!showQuestion);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
            className={`flashcard ${isHovering ? "hover" : ""}`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`card-inner ${showQuestion ? "flipped" : "" }`}>
                <div className="card-front"><div className={`card-text ${reveal ? "visible" : "hidden"}`}>{flashcard.front}</div></div>
                <div className="card-back"><div className={`card-text ${reveal ? "visible" : "hidden"}`}>{flashcard.back}</div></div>
            </div>
        </div>
    );
};

export default Flashcard;
