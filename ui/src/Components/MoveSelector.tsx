import { useEffect, useState } from "react";

interface MoveSelectorProps {
  selectedMove: string;
  onMoveChange: (move: string) => void;
}

export default function MoveSelector({ selectedMove, onMoveChange }: MoveSelectorProps) {
  const [moves, setMoves] = useState<string[]>([]);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/Game/choices");
        if (!response.ok) throw new Error("Failed to fetch moves");
        const data = await response.json();
        setMoves(data);
      } catch (err) {
        console.error(err);
        alert("Could not load available moves");
      }
    };
    fetchMoves();
  }, []);

  return (
    <select
      className="move-selector"
      value={selectedMove}
      onChange={(e) => onMoveChange(e.target.value)}
    >
      {moves.map((move) => (
        <option key={move} value={move}>
          {move}
        </option>
      ))}
    </select>
  );
}
