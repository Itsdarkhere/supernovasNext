import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";

// Store all marketplace sorting related states here

// Define type
interface SortState {
    desoMarketplace: boolean,
    marketplaceViewTypeCard: boolean,
    marketplaceVerifiedCreators: string,
    marketplaceContentFormat: string,
    marketplaceStatus: string,
    marketplaceNFTCategory: string,
    marketplaceLowPriceNanos: number,
    marketplaceHighPriceNanos: number,
    marketplaceLowPriceUSD: number,
    marketplaceHighPriceUSD: number,
    marketplacePriceRangeSet: boolean,
    marketplaceMarketType: string,
    marketplaceSortType: string,
    ethMarketplaceStatus: string,
    ethMarketplaceNFTCategory: string,
    ethMarketplaceVerifiedCreators: string,
}

// Define state
const initialState: SortState = {
    desoMarketplace: true,
    marketplaceViewTypeCard: true,
    marketplaceVerifiedCreators: "all",
    marketplaceContentFormat: "all",
    marketplaceStatus: "has bids",
    marketplaceNFTCategory: "all",
    marketplaceLowPriceNanos: 0,
    marketplaceHighPriceNanos: 0,
    marketplaceLowPriceUSD: 0,
    marketplaceHighPriceUSD: 0,
    marketplacePriceRangeSet: false,
    marketplaceMarketType: "all",
    marketplaceSortType: "most recent first",
    // Create reducers ....
    ethMarketplaceStatus: "all",
    ethMarketplaceNFTCategory: "all",
    ethMarketplaceVerifiedCreators: "verified",
}

export const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setDesoMarketplace: (state, action: PayloadAction<boolean>) => {
            state.desoMarketplace = action.payload;
        },
        setMarketplaceViewTypeCard: (state, action: PayloadAction<boolean>) => {
            state.marketplaceViewTypeCard = action.payload;
        },
        setMarketplaceVerifiedCreators: (state, action: PayloadAction<string>) => {
            state.marketplaceVerifiedCreators = action.payload;
        },
        setMarketplaceContentFormat: (state, action: PayloadAction<string>) => {
            state.marketplaceContentFormat = action.payload;
        },
        setMarketplaceStatus: (state, action: PayloadAction<string>) => {
            state.marketplaceStatus = action.payload;
        },
        setMarketplaceNFTCategory: (state, action: PayloadAction<string>) => {
            state.marketplaceNFTCategory = action.payload;
        },
        setMarketplaceLowPriceNanos: (state, action: PayloadAction<number>) => {
            state.marketplaceLowPriceNanos = action.payload;
        },
        setMarketplaceHighPriceNanos: (state, action: PayloadAction<number>) => {
            state.marketplaceHighPriceNanos = action.payload;
        },
        setMarketplaceLowPriceUSD: (state, action: PayloadAction<number>) => {
            state.marketplaceLowPriceUSD = action.payload;
        },
        setMarketPlaceHighPriceUSD: (state, action: PayloadAction<number>) => {
            state.marketplaceHighPriceUSD = action.payload;
        },
        setMarketplacePriceRangeSet: (state, action: PayloadAction<boolean>) => {
            state.marketplacePriceRangeSet = action.payload;
        },
        setMarketplaceMarketType: (state, action: PayloadAction<string>) => {
            state.marketplaceMarketType = action.payload;
        },
        setMarketplaceSortType: (state, action: PayloadAction<string>) => {
            state.marketplaceSortType = action.payload;
        },
    }
})

export const { 
    setDesoMarketplace, setMarketplaceViewTypeCard, setMarketplaceVerifiedCreators, setMarketplaceContentFormat, 
    setMarketplaceStatus, setMarketplaceNFTCategory, setMarketplaceLowPriceNanos, setMarketplaceHighPriceNanos, 
    setMarketplaceLowPriceUSD, setMarketPlaceHighPriceUSD, setMarketplacePriceRangeSet, setMarketplaceMarketType, 
    setMarketplaceSortType } = sortSlice.actions;

// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
export const selectSort = (state: AppState) => state.sort.desoMarketplace;

export default sortSlice.reducer;
