const Tiles = ({
  guess,
  wordLength,
  handleChange,
  currentGuessNum,
  currentGuess,
  solution,
}) => {
  const Tiles = [];

  for (let i = 0; i < wordLength; i++) {
    const char = guess[i];
    let className = "";
    if (char === solution[i]) {
      className = "correct";
    } else if (solution.includes(char)) {
      className = "in-correct";
    }
    Tiles.push(
      <input
        key={i}
        disabled={currentGuessNum !== currentGuess.num}
        className={className}
        type={"text"}
        value={char}
        onChange={(e) => handleChange(e, i)}
      />
    );
  }

  return <div className="tile-container"> {Tiles} </div>;
};

export default Tiles;
