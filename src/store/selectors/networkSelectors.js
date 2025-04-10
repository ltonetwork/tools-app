export const selectNodes = (state) => state.network.nodes;
export const selectGenerators = (state) => state.network.generators;
export const selectBlockHeight = (state) => state.network.blockHeight;
export const selectBurned = (state) => state.network.burned;
export const selectNetworkLoading = (state) => state.network.loading;
export const selectNetworkError = (state) => state.network.error;
