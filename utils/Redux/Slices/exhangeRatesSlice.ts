import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define exhange rates related states here

// Define type
interface ExhangeRateState {
    // Current fee to create a profile.
    createProfileFeeNanos: number,
    // ETH exchange rates
    usdPerETHExchangeRate: number,
    nanosPerETHExchangeRate: number,
    // BTC exchange rates
    satoshisPerDeSoExchangeRate: number,
    usdPerBitcoinExchangeRate: number,
    // USD exchange rates
    nanosPerUSDExchangeRate: number,
    ProtocolUSDCentsPerBitcoinExchangeRate: number,
    desoToUSDExchangeRateToDisplay: string,
    // Price of DeSo values
    ExchangeUSDCentsPerDeSo: number,
    USDCentsPerDeSoReservePrice: number,
    latestBitcoinAPIResponse: any,
    DEFAULT_NANOS_PER_USD_EXCHANGE_RATE: number,
}

// Define state
const initialState: ExhangeRateState = {
    createProfileFeeNanos: 100000,
    usdPerETHExchangeRate: undefined,
    nanosPerETHExchangeRate: undefined,
    satoshisPerDeSoExchangeRate: undefined,
    usdPerBitcoinExchangeRate: undefined,
    nanosPerUSDExchangeRate: undefined,
    ProtocolUSDCentsPerBitcoinExchangeRate: undefined,
    desoToUSDExchangeRateToDisplay: undefined,
    ExchangeUSDCentsPerDeSo: undefined,
    USDCentsPerDeSoReservePrice: null,
    latestBitcoinAPIResponse: undefined,
    // Note: I don't think we should have default values for this. I think we should just
    // loading spinner until we get a correct value. That said, I'm not going to fix that
    // right now, I'm just moving this magic number into a constant.
    DEFAULT_NANOS_PER_USD_EXCHANGE_RATE: 1e9,
}

export const exhangeRateSlice = createSlice({
    name: "exhangeRate",
    initialState,
    reducers: {
        setNanosPerUSDExchangeRate: (state, action: PayloadAction<number>) => {
            state.nanosPerUSDExchangeRate = action.payload;
        },
        setDesoToUSDExchangeRateToDisplay: (state, action: PayloadAction<string>) => {
            state.desoToUSDExchangeRateToDisplay = action.payload;
        },
        setExchangeUSDCentsPerDeSo: (state, action: PayloadAction<number>) => {
            state.ExchangeUSDCentsPerDeSo = action.payload;
        },
        setUSDCentsPerDeSoReservePrice: (state, action: PayloadAction<number>) => {
            state.USDCentsPerDeSoReservePrice = action.payload;
        },
        setUSDPerETHExchangeRate: (state, action: PayloadAction<number>) => {
            state.usdPerETHExchangeRate = action.payload;
        },
        setNanosPerETHExchangeRate: (state, action: PayloadAction<number>) => {
            state.nanosPerETHExchangeRate = action.payload;
        },
        setUSDPerBitcoinExchangeRate: (state, action: PayloadAction<number>) => {
            state.usdPerBitcoinExchangeRate = action.payload;
        },
        setProtocolUSDCentsPerBitcoinExchangeRate: (state, action: PayloadAction<number>) => {
            state.ProtocolUSDCentsPerBitcoinExchangeRate = action.payload;
        },
        setSatoshisPerDeSoExchangeRate: (state, action: PayloadAction<number>) => {
            state.satoshisPerDeSoExchangeRate = action.payload;
        },
        setLatestBitcoinAPIResponse: (state, action: PayloadAction<any>) => {
            state.latestBitcoinAPIResponse = action.payload;
        },
    }
})
// DEFINE ACTIONS 
export const {setNanosPerUSDExchangeRate, setDesoToUSDExchangeRateToDisplay, setExchangeUSDCentsPerDeSo, setUSDCentsPerDeSoReservePrice,
    setUSDPerETHExchangeRate, setNanosPerETHExchangeRate, setUSDPerBitcoinExchangeRate, setProtocolUSDCentsPerBitcoinExchangeRate,
    setSatoshisPerDeSoExchangeRate, setLatestBitcoinAPIResponse
 } = exhangeRateSlice.actions
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default exhangeRateSlice.reducer;