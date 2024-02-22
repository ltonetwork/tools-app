import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceClient } from "../../config";

const initialState = {
  allNodes: [],
  success: false,
  error: false,
};

export const getAllNodes = createAsyncThunk(
  "getAllNodes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await serviceClient.get("peers/connected");
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.messages);
      }
    }
  }
);
