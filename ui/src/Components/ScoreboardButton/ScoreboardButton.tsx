import scoreboard from "../../assets/scoreboard.png";
import "./ScoreboardButton.css"

type ScoreboardProps = {
  onClick?: () => void;
};

export default function ScoreboardButton({ onClick }: ScoreboardProps) {
  return (
    <div onClick={onClick} className = "scoreboard-btn">
      <img src={scoreboard} alt="Scoreboard" />
      <p>Scoreboard</p>
    </div>
  );
}