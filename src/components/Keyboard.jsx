const keysRow = ["QWERTYUIOP", "ASDFGHJKL", "+ZXCVBNM-"];

function getColors(letter, answer, guessessArray) {
  const ind = answer.indexOf(letter);
  if (ind === -1) return "wrong-keyboard";

  if (guessessArray.find((guess) => guess[ind] === letter))
    return "correct-keyboard";

  return "semi-correct-keyboard";
}

export default function Keyboard({
  letters,
  answer,
  guessessArray,
  handleMousePressed,
}) {
  return (
    <div className="app-keyboard">
      {keysRow.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.split("").map((letter, letterIndex) => (
            <div
              onClick={(e) => handleMousePressed(e)}
              key={letterIndex}
              className={`keyboard-letter ${
                letter === "+" || letter === "-" ? "keyboard-letter-big" : ""
              } ${
                letters.includes(letter) &&
                getColors(letter, answer, guessessArray)
              }`}
            >
              {letter === "+" ? "ENTER" : letter === "-" ? "DELETE" : letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
