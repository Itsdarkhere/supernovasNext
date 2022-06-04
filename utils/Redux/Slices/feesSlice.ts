import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionFee } from "../../backendapi-context";
import type { RootState } from "../store";

// Define fees related states here

// Define type
interface FeesState {
    defaultFeeRateNanosPerKB: number,
    feeRateDeSoPerKB: number,
    BuyDeSoFeeBasisPoints: number,
    transactionFeeMap: { [k: string]: TransactionFee[] },
    transactionFeeMax: number,
    transactionFeeInfo: string,
    NANOS_PER_UNIT: number,
    WEI_PER_ETH: number,
    MAX_POST_LENGTH: number,
    FOUNDER_REWARD_BASIS_POINTS_WARNING_THRESHOLD: number,
    CREATOR_COIN_RESERVE_RATIO: number,
    CREATOR_COIN_TRADE_FEED_BASIS_POINTS: number,
}

// Define state
const initialState: FeesState = {
    defaultFeeRateNanosPerKB: null,
    feeRateDeSoPerKB: 1000 / 1e9,
    BuyDeSoFeeBasisPoints: 0,
    transactionFeeMap: undefined,
    transactionFeeMax: 0,
    transactionFeeInfo: null,
    NANOS_PER_UNIT: 1e9,
    WEI_PER_ETH: 1e18,
    MAX_POST_LENGTH: 560,
    FOUNDER_REWARD_BASIS_POINTS_WARNING_THRESHOLD: 50 * 100,
    CREATOR_COIN_RESERVE_RATIO: 0.3333333,
    CREATOR_COIN_TRADE_FEED_BASIS_POINTS: 1,
}

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
        setTransactionFeeMap: (state, action: PayloadAction<{ [k: string]: TransactionFee[] }>) => {
            state.transactionFeeMap = action.payload;
        },
    }
})

// DEFINE ACTIONS 
export const { setBuyDeSoFeeBasisPoints, setFeeRateDeSoPerKB, setDefaultFeeRateNanosPerKB,
    setTransactionFeeInfo, setTransactionFeeMax, setTransactionFeeMap } = feesSlice.actions
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default feesSlice.reducer;