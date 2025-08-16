// PlayButton.tsx
interface PlayButtonProps {
  onClick: () => void;
}

export default function PlayButton({ onClick }: PlayButtonProps) {
  return (
    <button className="play-btn" onClick={onClick}>
      PLAY
    </button>
  );
}

