import { configureStore } from "@reduxjs/toolkit";
import GeneratorReducer from "./features/generatorSlice";

export const store = configureStore({
  reducer: {
    search: GeneratorReducer,
  },
});
