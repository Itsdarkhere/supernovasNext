import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define 'all' app related states here

// Define type
interface AppState {
    // This is set to false immediately after our first attempt to get a loggedInUser.
    loadingInitialAppState: boolean,
    // We're waiting for the user to grant storage access (full-screen takeover)
    requestingStorageAccess: boolean,
    // Check if we have requested storage access, if so dont show supernovas loader anymore
    requestedStorageAccess: boolean,
    // Track if the user is dragging the diamond selector. If so, need to disable text selection in the app.
    userIsDragging: boolean,
    pausePolling: boolean,
    // map[pubkey]->bool of globomods
    globoMods: any,
    showJumio: boolean,
    // Whether or not to show the Buy DeSo with USD flow.
    showBuyWithUSD: boolean;
    // Buy DESO with ETH
    showBuyWithETH: boolean;
    // Whether or not to show the Verify phone number flow.
    showPhoneNumberVerification: boolean,
    // If no erros received on mobile verification
    isPhoneNumberVerificationTextServerErrorFree: boolean,
}

// Define state
const initialState: AppState = {
    loadingInitialAppState: true,
    requestingStorageAccess: false,
    requestedStorageAccess: false,
    userIsDragging: false,
    pausePolling: false,
    globoMods: null,
    // Whether or not to show the Jumio verification flow.
    showJumio: false,
    showBuyWithETH: false,
    showBuyWithUSD: false,
    showPhoneNumberVerification: true,
    isPhoneNumberVerificationTextServerErrorFree: true,
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setRequestingStorageAccess: (state, action: PayloadAction<boolean>) => {
            state.requestingStorageAccess = action.payload;
        },
        setRequestedStorageAccess: (state, action: PayloadAction<boolean>) => {
            state.requestedStorageAccess = action.payload;
        },
        setShowBuyWithUSD: (state, action: PayloadAction<boolean>) => {
            state.showBuyWithUSD = action.payload;
        },
        setShowBuyWithETH: (state, action: PayloadAction<boolean>) => {
            state.showBuyWithETH = action.payload;
        },
        setShowJumio: (state, action: PayloadAction<boolean>) => {
            state.showJumio = action.payload;
        },
        setShowPhoneNumberVerification: (state, action: PayloadAction<boolean>) => {
            state.showPhoneNumberVerification = action.payload;
        },
        setGloboMods: (state, action: PayloadAction<any>) => {
            state.globoMods = action.payload;
        },
        setLoadingInitialAppState: (state, action: PayloadAction<boolean>) => {
            state.loadingInitialAppState = action.payload;
        },

    }
})

// DEFINE ACTIONS 
export const { setRequestingStorageAccess, setRequestedStorageAccess, setShowBuyWithUSD,
    setShowBuyWithETH, setShowJumio, setShowPhoneNumberVerification, setGloboMods,
    setLoadingInitialAppState} = appSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default appSlice.reducer;