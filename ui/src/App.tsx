import { useState } from "react";
import "./App.css";
import ScoreboardButton from "./Components/ScoreBoardButton";
import PlayerCard from "./Components/PlayarCard";
import RobotCard from "./Components/RobotCard";
import PlayButton from "./Components/PlayButton";
import ScoreboardModal from "./Components/ScoreboardModal";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerMove, setPlayerMove] = useState("");
  const [robotMove, setRobotMove] = useState("");
  const [result, setResult] = useState("");
  const [showScoreboard, setShowScoreboard] = useState(false);

  const handlePlay = async () => {
    if (!playerName) {
      alert("Please enter your name");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/Game/play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, playerChoice: playerMove }),
      });

      if (!response.ok) throw new Error("Game service error");

      const data = await response.json();
      console.log(data);
      setResult(data.result);
      setRobotMove(data.computerChoice);
    } catch (err) {
      console.error(err);
      alert("Failed to play the game");
    }
  };

  return (
    <div className="app">
      <ScoreboardButton onClick={() => setShowScoreboard(true)} />

      <div className="game-container">
        <PlayerCard
          playerName={playerName}
          onNameChange={setPlayerName}
          playerMove={playerMove}
          onMoveChange={setPlayerMove}
        />
        <PlayButton onClick={handlePlay} />
        <RobotCard robotMove={robotMove} />
      </div>

      {result && <div className="result-text"> You {result.toLowerCase()}</div>}

      <ScoreboardModal
        open={showScoreboard}
        onClose={() => setShowScoreboard(false)}
      />
    </div>
  );
}
