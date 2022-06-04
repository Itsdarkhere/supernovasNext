import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "rxjs/internal/scheduler/Action";
import type { AppState } from "../store";

// Define something being open related states here

// Define type
interface OpenState {
    isLeftBarMobileOpen: boolean,
    isMarketplaceLeftBarMobileOpen: boolean,
    isEthMarketplaceLeftBarMobileOpen: boolean,
}

// Define state
const initialState: OpenState = {
    isLeftBarMobileOpen: false,
    isMarketplaceLeftBarMobileOpen: false,
    isEthMarketplaceLeftBarMobileOpen: false,
}

export const openSlice = createSlice({
    name: "open",
    initialState,
    reducers: {
        setIsLeftBarMobileOpen: (state, action: PayloadAction<boolean>) => {
            state.isLeftBarMobileOpen = action.payload;
        },
        setIsMarketplaceLeftBarMobileOpen: (state, action: PayloadAction<boolean>) => {
            state.isMarketplaceLeftBarMobileOpen = action.payload;
        },
        setIsEthMarketplaceLeftBarMobileOpen: (state, action: PayloadAction<boolean>) => {
            state.isEthMarketplaceLeftBarMobileOpen = action.payload;
        }
    }
})

// DEFINE ACTIONS 
export const { setIsLeftBarMobileOpen, setIsMarketplaceLeftBarMobileOpen, setIsEthMarketplaceLeftBarMobileOpen } = openSlice.actions;

// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default openSlice.reducer;