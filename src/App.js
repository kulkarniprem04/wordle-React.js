import "./styles.css";
import { useState, useEffect } from "react";
import Tiles from "./Tiles";

const WORD_LENGTH = 5;

export default function App() {
  const [solution, setSolution] = useState("");
  const [totalGuesses, setTotalGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState({ num: 0, value: "" });

  useEffect(() => {
    const data = require("./WORD_BANK.json");
    setSolution(
      data.wordbank[Math.floor(Math.random() * data.wordbank.length)]
    );
  }, []);

  useEffect(() => {
    console.log(solution);
  }, [solution]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (currentGuess.value.length === WORD_LENGTH && e.key === "Enter") {
        let tempTotalGuess = [...totalGuesses];
        tempTotalGuess[currentGuess.num] = currentGuess.value;
        setTotalGuesses(tempTotalGuess);
        if (currentGuess.value === solution) {
          return;
        }
        setCurrentGuess((oldGuess) => ({
          num: oldGuess.num++,
          value: "",
        }));
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [currentGuess]);

  const handleChange = (e, index) => {
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      let tempGuess = currentGuess.value;
      tempGuess = tempGuess.replace(tempGuess[index], "");
      setCurrentGuess((oldGuess) => ({
        ...oldGuess,
        value: tempGuess,
      }));
    }
    setCurrentGuess((oldGuess) => ({
      ...oldGuess,
      value: oldGuess.value + e.target.value.toUpperCase(),
    }));
  };

  return (
    <div className="App">
      <h1>Wordle</h1>
      {totalGuesses.map((guess, i) => (
        <div key={i}>
          <Tiles
            currentGuessNum={i}
            guess={guess === null ? "" : guess}
            wordLength={WORD_LENGTH}
            handleChange={handleChange}
            currentGuess={currentGuess}
            solution={solution}
          />
        </div>
      ))}
    </div>
  );
}
