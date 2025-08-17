import { useGetScoresQuery, useResetScoresMutation, type ScoreEntry } from '../../services/scoreboardApi';
import './ScoreboardModal.css';

interface ScoreboardModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ScoreboardModal({ open, onClose }: ScoreboardModalProps) {
  const { data: history = [], isLoading, isError, refetch } = useGetScoresQuery(open ? 10 : 0, {
    skip: !open,
  });
  const [resetScores] = useResetScoresMutation();

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset the scoreboard?')) return;

    try {
      await resetScores().unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to reset scoreboard', err);
      alert('Failed to reset scoreboard');
    }
  };

  if (!open) return null;

  return (
    <div className="scoreboard-modal-overlay">
      <div className="scoreboard-modal">
        <button className="scoreboard-close-btn" onClick={onClose}>✕</button>
        <h2>Game History</h2>

        <button className="scoreboard-reset-btn" onClick={handleReset}>
          Reset Scoreboard
        </button>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Failed to load scores</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Player Move</th>
                <th>Robot Move</th>
                <th>Result</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry: ScoreEntry, idx: number) => (
                <tr key={entry.id}>
                  <td>{idx + 1}</td>
                  <td>{entry.playerName}</td>
                  <td>{entry.playerChoice}</td>
                  <td>{entry.computerChoice}</td>
                  <td>{entry.result}</td>
                  <td>{new Date(entry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
