import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceClient } from "../../config";

const initialState = {
  allWords: [],
  singleWord: {},
  loading: false,
  success: false,
  error: false,
};
