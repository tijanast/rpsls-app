import { useState } from 'react';
import './App.css';
import ScoreboardButton from './components/ScoreboardButtonComponent/ScoreboardButton';
import PlayerCard from './components/PlayerCardComponent/PlayarCard';
import RobotCard from './components/RobotCardComponent/RobotCard';
import PlayButton from './components/PlayButtonComponent/PlayButton';
import ScoreboardModal from './components/ScoreboardModalComponent/ScoreboardModal';
import MoveSelector from './components/MoveSelectorComponent/MoveSelector';
import { usePlayGameMutation } from './services/gameApi';

export default function App() {
  const [playerName, setPlayerName] = useState('');
  const [playerMove, setPlayerMove] = useState('');
  const [robotMove, setRobotMove] = useState('');
  const [result, setResult] = useState('');
  const [showScoreboard, setShowScoreboard] = useState(false);

  const [playGame, { isLoading }] = usePlayGameMutation();

  const handlePlay = async () => {
    if (!playerName) {
      alert('Please enter your name');
      return;
    }

    if (!playerMove) {
      alert('Please select a move');
      return;
    }

    try {
      const data = await playGame({ playerName, playerChoice: playerMove }).unwrap();
      setResult(data.result);
      setRobotMove(data.computerChoice);
    } catch (err) {
      console.error(err);
      alert('Failed to play the game');
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

      <ScoreboardModal open={showScoreboard} onClose={() => setShowScoreboard(false)} />
    </div>
  );
}
