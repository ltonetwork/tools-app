import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SCRIPT } from "../../services/config";
import { getApy } from "../../services/index";

export const fetchMarketData = createAsyncThunk(
  "market/fetchMarketData",
  async () => {
    const response = await axios.get(`${SCRIPT}/tools/market`);
    const apyData = await getApy();
    return {
      price: response.data.price.toFixed(3),
      marketCap: response.data.marketCap,
      apy: apyData.toFixed(3) + "%",
    };
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState: {
    price: null,
    marketCap: null,
    apy: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketData.fulfilled, (state, action) => {
        state.loading = false;
        state.price = action.payload.price;
        state.marketCap = action.payload.marketCap;
        state.apy = action.payload.apy;
      })
      .addCase(fetchMarketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default marketSlice.reducer;
