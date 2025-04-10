import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTokenSupply = createAsyncThunk(
  "tokenSupply/fetchTokenSupply",
  async () => {
    const response = await axios.get(
      "https://bridge.lto.network/stats/token-supply"
    );
    return {
      burnedSupply: response.data.burned_supply,
      circulatingMainnet: response.data.circulating_mainnet,
    };
  }
);

const tokenSupplySlice = createSlice({
  name: "tokenSupply",
  initialState: {
    burnedSupply: null,
    circulatingMainnet: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokenSupply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTokenSupply.fulfilled, (state, action) => {
        state.loading = false;
        state.burnedSupply = action.payload.burnedSupply;
        state.circulatingMainnet = action.payload.circulatingMainnet;
      })
      .addCase(fetchTokenSupply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tokenSupplySlice.reducer;
