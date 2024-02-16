import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceClient } from "../../config";

const initialState = {
  allWords: [],
  singleWord: {},
  loading: false,
  success: false,
  error: false,
};

export const getAllWords = createAsyncThunk(
  "getAllWords",
  async (_, { rejectWithValue }) => {
    try {
      const res = await serviceClient.get("dict");
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getSingleWord = createAsyncThunk(
  "getSingleWord",
  async (word, { rejectWithValue }) => {
    try {
      const res = await serviceClient.get(`dict/${word}`);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const generatorSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSingleWord: (state) => {
      return { ...state, singleWord: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWords.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getAllWords.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.allWords = action.payload;
      })
      .addCase(getAllWords.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(getSingleWord.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getSingleWord.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.singleWord = action.payload;
      })
      .addCase(getSingleWord.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });
  },
});

export const { clearSingleWord } = generatorSlice.actions;

export default generatorSlice.reducer;
