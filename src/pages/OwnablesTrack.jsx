import { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import Timeline from "../components/Timeline";
import { ObuilderApi, RelayApi } from "../services/index";
import { theme } from "../styles/theme";

const INITIAL_STEPS = [
  { label: "Stage 1: Obuilder queue", completed: false },
  { label: "Stage 2: Processing", completed: false },
  { label: "Stage 3: Ready", completed: false },
  { label: "Stage 4: Sent", completed: false },
  { label: "Stage 5: Message Arrived", completed: false },
];

const OwnablesTrack = () => {
  const muiTheme = useTheme();
  const [requestId, setRequestId] = useState("");
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [isPolling, setIsPolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryLimit] = useState(4);

  const obuilderApi = new ObuilderApi();
  const relayApi = new RelayApi();

  const checkRelayWithRetries = async (address, hash, retryCount) => {
    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const relayResponse = await relayApi.checkMessage(
          address,
          hash,
          "prod"
        );
        if (relayResponse) {
          setSteps((prevSteps) =>
            prevSteps.map((step, index) => ({
              ...step,
              completed: index < steps.length,
            }))
          );
          return true;
        }
      } catch (error) {
        console.error(`Relay API attempt ${attempt + 1} failed:`, error);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setError("Failed to verify message on relay after maximum retries");
    return false;
  };

  const handleSearch = useCallback(async () => {
    if (!requestId) {
      setError("Please enter a request ID");
      return;
    }

    if (handleSearch.running) return;
    handleSearch.running = true;

    setIsLoading(true);
    setError(null);

    try {
      const obuilderResponse = await obuilderApi.track(requestId, "L", "prod");

      if (!obuilderResponse || !obuilderResponse[0]) {
        setError("No data found for this request ID");
        return;
      }

      const updatedSteps = steps.map((step, index) => ({
        ...step,
        completed: index < obuilderResponse[0].ownableStatus,
      }));
      setSteps(updatedSteps);

      if (obuilderResponse[0].ownableStatus >= steps.length - 1) {
        const { ltoWallet: address, hash } = obuilderResponse[0];
        const relaySuccess = await checkRelayWithRetries(
          address,
          hash,
          retryLimit
        );

        if (relaySuccess) {
          setIsPolling(false);
        }
      }
    } catch (error) {
      console.error("Error during search:", error);
      setError(error.message || "An error occurred while tracking the request");
    } finally {
      setIsLoading(false);
      handleSearch.running = false;
    }
  }, [requestId, steps, retryLimit]);

  handleSearch.running = false;

  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      handleSearch();
    }, 2000);

    return () => clearInterval(interval);
  }, [handleSearch, isPolling]);

  const handleTrackClick = () => {
    setError(null);
    setIsPolling(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        background: `linear-gradient(135deg, ${muiTheme.palette.background.default} 0%, ${muiTheme.palette.background.paper} 100%)`,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "2xl",
          p: { xs: 3, sm: 4 },
          borderRadius: theme.borderRadius.lg,
          background: theme.colors.background.paper,
          boxShadow: theme.shadows.lg,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 2,
            color: theme.colors.primary.main,
            fontWeight: 700,
            fontSize: { xs: "1.75rem", sm: "2rem" },
          }}
        >
          Track your Ownable
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 4,
            color: theme.colors.text.secondary,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Paste your request ID to track your Ownable!
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 3 },
            mb: 6,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Request ID"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: theme.borderRadius.md,
                "&:hover fieldset": {
                  borderColor: theme.colors.secondary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.colors.secondary.main,
                },
              },
              "& .MuiFormHelperText-root": {
                color: theme.colors.error.main,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleTrackClick}
            disabled={isLoading}
            sx={{
              height: "56px",
              minWidth: "120px",
              whiteSpace: "nowrap",
              backgroundColor: theme.colors.secondary.main,
              "&:hover": { backgroundColor: theme.colors.secondary.dark },
              "&:disabled": { backgroundColor: theme.colors.text.disabled },
              borderRadius: theme.borderRadius.md,
              transition: theme.transitions.default,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Track"
            )}
          </Button>
        </Box>

        <Timeline steps={steps} />
      </Paper>
    </Box>
  );
};

export default OwnablesTrack;
