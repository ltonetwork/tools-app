import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Timeline from "../components/Timeline";
import { ObuilderApi, RelayApi } from "../services/index";

const OwnablesTrack = () => {
  const [requestId, setRequestId] = useState("");
  const [env, setEnv] = useState("staging");
  const [network, setNetwork] = useState("T");
  const [steps, setSteps] = useState([
    { label: "Stage 1: Obuilder queue", completed: false },
    { label: "Stage 2: Processing", completed: false },
    { label: "Stage 3: Ready", completed: false },
    { label: "Stage 4: Sent", completed: false },
    { label: "Stage 5: Message Arrived", completed: false },
  ]);
  const [isPolling, setIsPolling] = useState(false);
  const [retryLimit] = useState(4);

  const obuilderApi = new ObuilderApi();
  const relayApi = new RelayApi();

  const checkRelayWithRetries = async (address, hash, retryCount) => {
    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const relayResponse = await relayApi.checkMessage(address, hash, env);
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
    console.error("Relay task failed after maximum retries.");
    return false;
  };

  const handleSearch = useCallback(async () => {
    if (!requestId) return;

    if (handleSearch.running) return;
    handleSearch.running = true;

    try {
      const obuilderResponse = await obuilderApi.track(requestId, network, env);

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
    } finally {
      handleSearch.running = false;
    }
  }, [requestId, env, network, steps, obuilderApi, retryLimit]);

  handleSearch.running = false;

  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      handleSearch();
    }, 2000);

    return () => clearInterval(interval);
  }, [handleSearch, isPolling]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 text-center text-[#18054B]">
        Track your Ownable
      </h1>
      <p className="text-sm sm:text-base mb-6 text-center">
        Paste your request ID, select the network and environment, then click
        TRACK!
      </p>

      {/* Input and Search Button */}
      <div className="flex flex-col sm:flex-row w-full max-w-md items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <TextField
          fullWidth
          variant="outlined"
          label="Request ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsPolling(true)}
          sx={{
            height: "56px",
            minWidth: "120px",
            whiteSpace: "nowrap",
            backgroundColor: "#18054B",
            "&:hover": { backgroundColor: "#1a0b5e" },
          }}
        >
          Track
        </Button>
      </div>

      {/* Environment and Network Dropdowns */}
      <div className="flex flex-col sm:flex-row w-full max-w-md space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <Select
          value={env}
          onChange={(e) => setEnv(e.target.value)}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="staging">Staging</MenuItem>
          <MenuItem value="prod">Production</MenuItem>
        </Select>
        <Select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="L">Mainnet</MenuItem>
          <MenuItem value="T">Testnet</MenuItem>
        </Select>
      </div>

      {/* Timeline */}
      <Timeline steps={steps} />
    </div>
  );
};

export default OwnablesTrack;
