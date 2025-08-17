import "./PlayButton.scss";

interface PlayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function PlayButton({ onClick, disabled = false }: PlayButtonProps) {
  return (
    <button className="play-btn" onClick={onClick} disabled={disabled}>
      PLAY
    </button>
  );
}