import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NFTCollectionResponse } from "../../backendapi-context";
import type { AppState } from "../store";

// Define 'profile' related states here

// Define type
interface ProfileState {
    ethNFTsCollected: NFTCollectionResponse[],
    ethNFTsCreated: NFTCollectionResponse[],
    createdNFTsToShow: any,
    collectedNFTsToShow: any,
}

// Define state
const initialState: ProfileState = {
    ethNFTsCollected: [],
    ethNFTsCreated: [],
    createdNFTsToShow: [],
    collectedNFTsToShow: [],
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setETHNFTsCollected: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.ethNFTsCollected = action.payload;
        },
        concatToETHNFTsCollected: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.ethNFTsCollected = state.ethNFTsCollected.concat(...state.ethNFTsCollected, action.payload);
        },
        setETHNFTsCreated: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.ethNFTsCreated = action.payload;
        },
        concatToCollectedNFTsToShow: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.collectedNFTsToShow = state.collectedNFTsToShow.concat(action.payload);
        },
        concatToCreatedNFTsToShow: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.createdNFTsToShow = state.createdNFTsToShow.concat(action.payload);
        },
    }
})

// DEFINE ACTIONS 
export const { setETHNFTsCollected, setETHNFTsCreated, concatToETHNFTsCollected, concatToCollectedNFTsToShow, concatToCreatedNFTsToShow} = profileSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default profileSlice.reducer;