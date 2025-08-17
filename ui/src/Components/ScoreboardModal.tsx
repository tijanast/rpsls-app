import React, { useState, useEffect } from "react";

interface ScoreEntry {
  id: string;
  playerName: string;
  playerChoice: string;
  computerChoice: string;
  result: string;
  createdAt: string;
}

interface ScoreboardModalProps {
  open: boolean;
  onClose: () => void;
}

const ScoreboardModal: React.FC<ScoreboardModalProps> = ({ open, onClose }) => {
  const [history, setHistory] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch("http://localhost:5002/api/Scoreboard?take=10")
        .then((res) => res.json())
        .then((data: ScoreEntry[]) => setHistory(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleReset = async () => {
    if (!window.confirm("Are you sure you want to reset the scoreboard?")) return;

    try {
      await fetch("http://localhost:5002/api/Scoreboard", {
        method: "DELETE",
      });
      setHistory([]);
    } catch (err) {
      console.error("Failed to reset scoreboard", err);
      alert("Failed to reset scoreboard");
    }
  };

  if (!open) return null;

  return (
    <div className="scoreboard-modal-overlay">
      <div className="scoreboard-modal">
        <button className="scoreboard-close-btn" onClick={onClose}>✕</button>
        <h2>Game History</h2>

        {/* Reset button */}
        <button className="scoreboard-reset-btn" onClick={handleReset}>
          Reset Scoreboard
        </button>

        {loading ? (
          <p>Loading...</p>
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
              {history.map((entry, idx) => (
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
};

export default ScoreboardModal;
