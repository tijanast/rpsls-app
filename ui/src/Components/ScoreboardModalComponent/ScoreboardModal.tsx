import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  useGetScoresQuery,
  useResetScoresMutation,
  type ScoreEntry,
} from "../../services/scoreboardApi";

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
    if (!window.confirm("Are you sure you want to reset the scoreboard?")) return;

    try {
      await resetScores().unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to reset scoreboard", err);
      alert("Failed to reset scoreboard");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Game History</DialogTitle>

      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Typography color="error">Failed to load scores</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ color: "white" }}>
            <Table sx={{ backgroundColor: "black" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>#</TableCell>
                  <TableCell sx={{ color: "white" }}>Player</TableCell>
                  <TableCell sx={{ color: "white" }}>Player Move</TableCell>
                  <TableCell sx={{ color: "white" }}>Robot Move</TableCell>
                  <TableCell sx={{ color: "white" }}>Result</TableCell>
                  <TableCell sx={{ color: "white" }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((entry: ScoreEntry, idx: number) => (
                  <TableRow key={entry.id}>
                    <TableCell sx={{ color: "white" }}>{idx + 1}</TableCell>
                    <TableCell sx={{ color: "white" }}>{entry.playerName}</TableCell>
                    <TableCell sx={{ color: "white" }}>{entry.playerChoice}</TableCell>
                    <TableCell sx={{ color: "white" }}>{entry.computerChoice}</TableCell>
                    <TableCell sx={{ color: "white" }}>{entry.result}</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(entry.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleReset} color="error" variant="outlined">
          Reset Scoreboard
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
