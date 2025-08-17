import { useState } from "react";
import ScoreboardButton from "../ScoreboardButtonComponent/ScoreboardButton";
import PlayerCard from "../PlayerCardComponent/PlayarCard";
import RobotCard from "../RobotCardComponent/RobotCard";
import PlayButton from "../PlayButtonComponent/PlayButton";
import ScoreboardModal from "../ScoreboardModalComponent/ScoreboardModal";
import { usePlayGameMutation } from "../../services/gameApi";
import "./GameWrapper.scss";

export default function GameWrapper() {
  const [playerName, setPlayerName] = useState("");
  const [playerMove, setPlayerMove] = useState("");
  const [robotMove, setRobotMove] = useState("");
  const [result, setResult] = useState("");
  const [showScoreboard, setShowScoreboard] = useState(false);

  const [playGame, { isLoading }] = usePlayGameMutation();

  const handlePlay = async () => {
    if (!playerName || !playerMove) return;

    try {
      const data = await playGame({ playerName, playerChoice: playerMove }).unwrap();
      setResult(data.result);
      setRobotMove(data.computerChoice);
    } catch (err) {
      console.error(err);
      alert("Failed to play the game or save score");
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
        <PlayButton onClick={handlePlay} disabled={isLoading} />
        <RobotCard robotMove={robotMove} />
      </div>

      {result && <div className="result-text">You {result.toLowerCase()}</div>}

      <ScoreboardModal
        open={showScoreboard}
        onClose={() => setShowScoreboard(false)}
      />
    </div>
  );
}
