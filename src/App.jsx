import { useCallback, useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import WordleBoard from "./components/WordleBoard";
import words from "./lib/words";
import ResultModal from "./components/ResultModal";

function App() {
  const [answer, setAnswer] = useState("");
  const [guessessArray, setGuessessArray] = useState(new Array(6).fill(""));
  const [currWord, setCurrWord] = useState("");
  const [currRow, setCurrRow] = useState(0);
  const [letters, setLetters] = useState("");
  const [isModal, setIsModal] = useState();
  const [isWon, setIsWon] = useState();
  useEffect(() => {
    setAnswer(words[Math.floor(Math.random() * words.length)].toUpperCase());
  }, []);

  const removeRepeatedLetters = (str1, str2) => {
    return Array.from(new Set(str1 + str2)).join("");
  };

  const handleEnter = () => {
    setGuessessArray((guessessArray) =>
      guessessArray.map((guess, index) =>
        index === currRow ? currWord : guess
      )
    );
    setLetters((letters) => removeRepeatedLetters(currWord, letters));
    setCurrRow((currRow) => currRow + 1);
    setCurrWord("");
  };
  const handleDelete = () => {
    setCurrWord((currWord) => currWord.slice(0, -1));
  };
  const handleAdd = (key) => {
    setCurrWord((currWord) => currWord + key.toUpperCase());
  };

  const handleMousePressed = (e) => {
    const key = e.target.textContent;

    if (key === "ENTER" && currWord.length === 5) {
      handleEnter();
    } else if (key === "DELETE" && currWord.length > 0) {
      handleDelete();
    } else if (key != "ENTER" && key != "DELETE" && currWord.length < 5) {
      handleAdd(key);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      const { key, keyCode } = e;

      if (keyCode === 8 && currWord.length > 0) {
        handleDelete();
        return;
      }

      if (currWord.length === 5) {
        if (keyCode !== 13) return;
        else {
          handleEnter();
        }
      }

      if (keyCode >= 65 && keyCode <= 90) {
        handleAdd(key);
        return;
      }
    },
    [currWord, currRow]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (guessessArray[currRow - 1] === answer && answer) {
      setIsModal(true);
      setIsWon(true);
    } else if (currRow > 5) {
      setIsModal(true);
    }
  }, [guessessArray, currRow, answer]);

  return (
    <div className="app-container">
      <WordleBoard
        guessessArray={guessessArray}
        currRow={currRow}
        currWord={currWord}
        answer={answer}
      />
      <Keyboard
        answer={answer}
        letters={letters}
        guessessArray={guessessArray}
        handleMousePressed={handleMousePressed}
      />
      <ResultModal isWon={isWon} answer={answer} isModal={isModal} />
    </div>
  );
}

export default App;
