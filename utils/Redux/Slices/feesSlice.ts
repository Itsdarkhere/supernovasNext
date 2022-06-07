import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionFee } from "../../backendapi-context";
import type { AppState } from "../store";

// Define fees related states here

// Define type
interface FeesState {
  defaultFeeRateNanosPerKB: number;
  feeRateDeSoPerKB: number;
  BuyDeSoFeeBasisPoints: number;
  transactionFeeMap: { [k: string]: TransactionFee[] };
  transactionFeeMax: number;
  transactionFeeInfo: string;
}

// Define state
const initialState: FeesState = {
  defaultFeeRateNanosPerKB: null,
  feeRateDeSoPerKB: 1000 / 1e9,
  BuyDeSoFeeBasisPoints: 0,
  transactionFeeMap: undefined,
  transactionFeeMax: 0,
  transactionFeeInfo: null,
};

export const feesSlice = createSlice({
  name: "fees",
  initialState,
  reducers: {
    setBuyDeSoFeeBasisPoints: (state, action: PayloadAction<number>) => {
      state.BuyDeSoFeeBasisPoints = action.payload;
    },
    setFeeRateDeSoPerKB: (state, action: PayloadAction<number>) => {
      state.feeRateDeSoPerKB = action.payload;
    },
    setDefaultFeeRateNanosPerKB: (state, action: PayloadAction<number>) => {
      state.defaultFeeRateNanosPerKB = action.payload;
    },
    setTransactionFeeInfo: (state, action: PayloadAction<string>) => {
      state.transactionFeeInfo = action.payload;
    },
    setTransactionFeeMax: (state, action: PayloadAction<number>) => {
      state.transactionFeeMax = action.payload;
    },
    setTransactionFeeMap: (
      state,
      action: PayloadAction<{ [k: string]: TransactionFee[] }>
    ) => {
      state.transactionFeeMap = action.payload;
    },
  },
});

// DEFINE ACTIONS
export const {
  setBuyDeSoFeeBasisPoints,
  setFeeRateDeSoPerKB,
  setDefaultFeeRateNanosPerKB,
  setTransactionFeeInfo,
  setTransactionFeeMax,
  setTransactionFeeMap,
} = feesSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default feesSlice.reducer;
