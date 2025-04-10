import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "./slices/marketSlice";
import networkReducer from "./slices/networkSlice";
import nodesReducer from "./slices/nodesSlice";
import tokenSupplyReducer from "./slices/tokenSupplySlice";

export const store = configureStore({
  reducer: {
    market: marketReducer,
    network: networkReducer,
    nodes: nodesReducer,
    tokenSupply: tokenSupplyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
