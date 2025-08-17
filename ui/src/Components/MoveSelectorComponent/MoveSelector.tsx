import { useGetMovesQuery } from '../../services/gameApi';
import './MoveSelector.css';

interface MoveSelectorProps {
  selectedMove: string;
  onMoveChange: (move: string) => void;
}

export default function MoveSelector({ selectedMove, onMoveChange }: MoveSelectorProps) {
  const { data: moves = [], isLoading, isError } = useGetMovesQuery();

  if (isError) {
    console.error('Failed to load moves');
  }

  return (
    <select
      className="move-selector"
      value={selectedMove}
      onChange={(e) => onMoveChange(e.target.value)}
      disabled={isLoading || isError}
    >
      <option value="" disabled>
        {isLoading ? 'Loading moves...' : 'Select your move'}
      </option>
      {moves.map((move) => (
        <option key={move} value={move}>
          {move}
        </option>
      ))}
    </select>
  );
}
