import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define other states here,,, if you come up with a better file
// please add them accordingly there

// Define type
interface OtherState {
    buyETHAddress: string,
    NFTRoyaltyToCoinBasisPoints: any,
    NFTRoyaltyToCreatorBasisPoints: any,
    NanosSold: number,
    nanosToDeSoMemo: any,
    formatUSDMemo: any,
    confetti: any,
    canvasCount: number,
    minSatoshisBurnedForProfileCreation: number,
    jumioDeSoNanos: number,
    referralUSDCents: number,
    updateEverything: any,
}

// Define state
const initialState: OtherState = {
    buyETHAddress: "",
    NFTRoyaltyToCoinBasisPoints: null,
    NFTRoyaltyToCreatorBasisPoints: null,
    NanosSold: null,
    nanosToDeSoMemo: undefined,
    formatUSDMemo: undefined,
    confetti: undefined,
    canvasCount: 0,
    minSatoshisBurnedForProfileCreation: null,
    jumioDeSoNanos: 0,
    referralUSDCents: 0,
    updateEverything: undefined,
}

export const otherSlice = createSlice({
    name: "other",
    initialState,
    reducers: {
        setNanosSold: (state, action: PayloadAction<number>) => {
            state.NanosSold = action.payload;
        },
        setConfetti: (state, action: PayloadAction<any>) => {
            state.confetti = action.payload;
        },
        setNanosToDeSoMemo: (state, action: PayloadAction<any>) => {
            state.nanosToDeSoMemo = action.payload;
        },
        setFormatUSDMemo: (state, action: PayloadAction<any>) => {
            state.formatUSDMemo = action.payload;
        },
        setCanvasCount: (state, action: PayloadAction<number>) => {
            state.canvasCount = action.payload;
        },
        setReferralUSDCents: (state, action: PayloadAction<number>) => {
            state.referralUSDCents = action.payload;
        },
        setUpdateEverything: (state, action: PayloadAction<any>) => {
            state.updateEverything = action.payload;
        },
        setMinSatoshisBurnedForProfileCreation: (state, action: PayloadAction<number>) => {
            state.minSatoshisBurnedForProfileCreation = action.payload;
        },
        setJumioDeSoNanos: (state, action: PayloadAction<number>) => {
            state.jumioDeSoNanos = action.payload;
        },
        setBuyETHAddress: (state, action: PayloadAction<string>) => {
            state.buyETHAddress = action.payload;
        },
    }
})

// DEFINE ACTIONS 
export const { setNanosSold, setConfetti, setNanosToDeSoMemo, setFormatUSDMemo, 
    setCanvasCount, setReferralUSDCents, setUpdateEverything, setMinSatoshisBurnedForProfileCreation,
    setJumioDeSoNanos, setBuyETHAddress } = otherSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default otherSlice.reducer;