import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeSoNode } from "../../backendapi-context";
import type { RootState } from "../store";

// Define node related states here

// Define type
interface NodeState {
    localNode: string,
    nodeInfo: any,
    isTestnet: boolean,
    nodes: { [id: number]: DeSoNode },
    // Whether or not this node comps profile creation.
    isCompProfileCreation: boolean;
}

// Define state
const initialState: NodeState = {
    localNode: "https://supernovas.app",
    nodeInfo: undefined,
    isTestnet: false,
    nodes: undefined,
    isCompProfileCreation: false,
}

export const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        setLocalNode: (state, action: PayloadAction<string>) => {
            state.localNode = action.payload
        },
        setIsTestnetGlob: (state, action: PayloadAction<boolean>) => {
            state.isTestnet = action.payload
        },
        setIsCompProfileCreation: (state, action: PayloadAction<boolean>) => {
            state.isCompProfileCreation = action.payload
        },
        setNodes: (state, action: PayloadAction<{ [id: number]: DeSoNode }>) => {
            state.nodes = action.payload
        },
    }
})

// DEFINE ACTIONS 
export const { setLocalNode, setIsTestnetGlob, setIsCompProfileCreation, setNodes } = nodeSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default nodeSlice.reducer;