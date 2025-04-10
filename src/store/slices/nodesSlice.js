import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EXT_URL2 } from "../../services/config";

export const fetchNodes = createAsyncThunk("nodes/fetchNodes", async () => {
  const response = await axios.get(`${EXT_URL2}nodes/json`);
  return response.data;
});

const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    nodes: [],
    filteredNodes: [],
    searchTerm: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredNodes = state.nodes.filter(
        (node) =>
          node.name &&
          node.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNodes.fulfilled, (state, action) => {
        state.loading = false;
        state.nodes = action.payload;
        state.filteredNodes = action.payload;
      })
      .addCase(fetchNodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = nodesSlice.actions;
export default nodesSlice.reducer;
