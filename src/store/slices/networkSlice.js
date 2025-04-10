import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../services/config";
import { getNodeNumber, getGenerators } from "../../services/index";

export const fetchNetworkData = createAsyncThunk(
  "network/fetchNetworkData",
  async () => {
    const [nodes, generators, supplyData] = await Promise.all([
      getNodeNumber(),
      getGenerators(),
      axios.get(`${BASE_URL}supply`),
    ]);

    return {
      nodes,
      generators: generators.length,
      blockHeight: supplyData.data.height,
      burned: supplyData.data.burned / 100000000,
    };
  }
);

const networkSlice = createSlice({
  name: "network",
  initialState: {
    nodes: null,
    generators: 0,
    blockHeight: null,
    burned: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNetworkData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetworkData.fulfilled, (state, action) => {
        state.loading = false;
        state.nodes = action.payload.nodes;
        state.generators = action.payload.generators;
        state.blockHeight = action.payload.blockHeight;
        state.burned = action.payload.burned;
      })
      .addCase(fetchNetworkData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default networkSlice.reducer;
