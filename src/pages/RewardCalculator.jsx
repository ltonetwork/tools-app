import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const RewardCalculator = () => {
  const [amount, setAmount] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [estimatedRewards, setEstimatedRewards] = useState("");

  const handleCalculate = () => {
    const rewards = parseFloat(amount) * parseFloat(timeframe);
    setEstimatedRewards(rewards.toFixed(2));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Reward Calculator
        </Typography>
        <TextField
          label="Amout Leased"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          margin="normal"
        />
        <TextField
          label="Timeframe (in months)"
          variant="outlined"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCalculate}>
          Calculate
        </Button>
        {estimatedRewards && (
          <Typography variant="body1" style={{ marginTop: 10 }}>
            Estimated Rewards: {estimatedRewards} LTO
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RewardCalculator;
