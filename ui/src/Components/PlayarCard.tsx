import MoveSelector from "./MoveSelector";
import playerAvatar from "../assets/player-avatar.png";

interface PlayerCardProps {
  playerName: string;
  onNameChange: (name: string) => void;
  playerMove: string;
  onMoveChange: (move: string) => void;
}

export default function PlayerCard({ playerName, onNameChange, playerMove, onMoveChange }: PlayerCardProps) {
  return (
    <div className="player-card">
      <img src={playerAvatar} alt="Player" className="avatar" />
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <MoveSelector selectedMove={playerMove} onMoveChange={onMoveChange} />
    </div>
  );
}
