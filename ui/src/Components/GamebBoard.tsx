import { useState, useEffect } from "react";

export const GameBoard = () => {
  const [moves, setMoves] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState<string>("");
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [robotChoice, setRobotChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/Game/choices");
        if (!response.ok) throw new Error("Failed to fetch choices");
        const data = await response.json();
        setMoves(data);
        setPlayerChoice(data[0] || null); 
      } catch (err) {
        console.error(err);
        alert("Failed to load moves");
      }
    };
    fetchChoices();
  }, []);

  const playGame = async (choice: string) => {
    if (!playerName) {
      alert("Please enter your name");
      return;
    }

    setPlayerChoice(choice);

    try {
      const response = await fetch("http://localhost:5001/api/Game/play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, playerChoice: choice })
      });

      if (!response.ok) throw new Error("Game service error");

      const data = await response.json();
      setRobotChoice(data.robotMove); 
      setResult(data.result);
    } catch (err) {
      console.error(err);
      alert("Failed to play the game");
    }
  };

  return (
    <div>
      <h1>Rock Paper Scissors Lizard Spock</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div>
        {moves.map((move) => (
          <button key={move} onClick={() => playGame(move)}>
            {move}
          </button>
        ))}
      </div>
      {playerChoice && robotChoice && (
        <div>
          <p>You chose: {playerChoice}</p>
          <p>Robot chose: {robotChoice}</p>
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
};
