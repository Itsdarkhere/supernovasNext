import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../store";

// Define IMX related states here

// Define type
interface IMXState {
    imxWalletConnected: boolean,
    imxWalletAddress: string,
    imxClient: any,
    imxBalance: any,
    wantToDepositEth: boolean,
    wantToBuyEth: boolean,
    isEthereumNFTForSale: boolean,
    ethWalletAddresShort: string,
    isEthQuoteRepost: boolean,
    isEthWalletAssociatedToDesoProfile: boolean,
}

// Define state
const initialState: IMXState = {
    imxWalletConnected: false,
    imxWalletAddress: null,
    imxClient: "",
    imxBalance: "",
    wantToDepositEth: false,
    wantToBuyEth: false,
    isEthereumNFTForSale: false,
    ethWalletAddresShort: "",
    isEthQuoteRepost: false,
    isEthWalletAssociatedToDesoProfile: false,
}

export const imxSlice = createSlice({
    name: "imx",
    initialState,
    reducers: {
        setIMXClient: (state, action: PayloadAction<any>) => {
            state.imxClient = action.payload;
        },
        setIMXWalletAddress: (state, action: PayloadAction<string>) => {
            state.imxWalletAddress = action.payload;
        }
    }
})
// DEFINE ACTIONS 

export const { setIMXClient, setIMXWalletAddress } = imxSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default imxSlice.reducer;