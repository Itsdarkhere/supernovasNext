import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";
import { NFTCollectionResponse } from "../../backendapi-context"

// Store all marketplace NOT sort related states here

// Define type
interface MarketState {
    nftsData: NFTCollectionResponse[],
    nftsDataToShow: NFTCollectionResponse[],
    ethMarketplaceNFTsData: NFTCollectionResponse[],
    ethMarketplaceNFTsDataToShow: NFTCollectionResponse[],
    marketplaceNFTsOffset: number,
    ethMarketplaceNFTsOffset: number,
    isMarketplaceLoading: boolean,
}

// Define state
const initialState: MarketState = {
    nftsData: [],
    nftsDataToShow: [],
    ethMarketplaceNFTsData: [],
    ethMarketplaceNFTsDataToShow: [],
    marketplaceNFTsOffset: 0,
    ethMarketplaceNFTsOffset: 0,
    isMarketplaceLoading: true,
}

export const marketplaceSlice = createSlice({
    name: "marketplace",
    initialState,
    reducers: {
        setNFTsData: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.nftsData = action.payload;
        },
        setNFTsDataToShow: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.nftsDataToShow = action.payload;
        },
        setETHMarketplaceNFTsData: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.ethMarketplaceNFTsData = action.payload;
        },
        pushToETHMarketplaceNFTsData: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            // Check works
            state.ethMarketplaceNFTsData = state.ethMarketplaceNFTsData.concat(action.payload);
        },
        setETHMarketplaceNFTsDataToShow: (state, action: PayloadAction<NFTCollectionResponse[]>) => {
            state.nftsData = action.payload;
        },
        setMarketplaceNFTsOffset: (state, action: PayloadAction<number>) => {
            state.marketplaceNFTsOffset = action.payload;
        },
        addToMarketplaceNFTsOffset:  (state, action: PayloadAction<number>) => {
            state.marketplaceNFTsOffset += action.payload;
        },
        setEthMarketplaceNFTsOffset: (state, action: PayloadAction<number>) => {
            state.ethMarketplaceNFTsOffset = action.payload;
        },
        addToEthMarketplaceNFTsOffset: (state, action: PayloadAction<number>) => {
            state.ethMarketplaceNFTsOffset += action.payload;
        },
        setIsMarketplaceLoading: (state, action: PayloadAction<boolean>) => {
            state.isMarketplaceLoading = action.payload;
        }

    }
})

export const {setNFTsData, setNFTsDataToShow, setETHMarketplaceNFTsData, setETHMarketplaceNFTsDataToShow, setMarketplaceNFTsOffset,
    addToMarketplaceNFTsOffset, setEthMarketplaceNFTsOffset, 
    addToEthMarketplaceNFTsOffset, setIsMarketplaceLoading, pushToETHMarketplaceNFTsData } = marketplaceSlice.actions;

// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
export const selectMarketplace = (state: AppState) => state.sort.desoMarketplace;

export default marketplaceSlice.reducer;
