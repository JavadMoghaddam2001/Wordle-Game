function getColors(answer, word) {
  const result = answer.split("");
  for (let i = 0; i < answer.length; i++) {
    if (word[i] === result[i]) result[i] = "1";
  }
  for (let i = 0; i < answer.length; i++) {
    const ind = result.indexOf(word[i]);
    if (ind > -1) {
      result[i] = "2";
    }
  }

  return result.map((letter) => {
    if (letter === "1") return "correct";
    if (letter === "2") return "semi-correct";
    return "wrong";
  });
}

function Row({ word, isFinished, answer }) {
  const colors = isFinished ? getColors(answer, word) : new Array(5).fill("");

  return (
    <>
      {new Array(5).fill("").map((cell, cellIndex) => (
        <div key={cellIndex} className={`app-board-cell ${colors[cellIndex]}`}>
          {word[cellIndex] !== undefined ? word[cellIndex] : ""}
        </div>
      ))}
    </>
  );
}

export default function WordleBoard({
  guessessArray,
  currRow,
  currWord,
  answer,
}) {
  return (
    <div className="app-board">
      {guessessArray.map((row, rowIndex) => (
        <div key={rowIndex} className="app-board-row">
          <Row
            word={currRow === rowIndex ? currWord : guessessArray[rowIndex]}
            isFinished={currRow > rowIndex}
            answer={answer}
          />
        </div>
      ))}
    </div>
  );
}
