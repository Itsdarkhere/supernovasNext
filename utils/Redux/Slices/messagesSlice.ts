import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define messages related states here

// Define type
interface MessagesState {
    messageNotificationCount: number,
    messagesSortAlgorithm: string,
    messagesPerFetch: number,
    openSettingsTray: boolean,
    newMessagesFromPage: number,
    messagesRequestsHoldersOnly: boolean,
    messagesRequestsHoldingsOnly: boolean,
    messagesRequestsFollowersOnly: boolean,
    messagesRequestsFollowedOnly: boolean,
    pauseMessageUpdates: boolean,
    messageResponse: any,
    messageMeta: {
        decryptedMessgesMap: {},
        notificationMap: {}
    }
}

// Define state
const initialState: MessagesState = {
    messageNotificationCount: 0,
    messagesSortAlgorithm: "time",
    messagesPerFetch: 25,
    openSettingsTray: false,
    newMessagesFromPage: 0,
    messagesRequestsHoldersOnly: true,
    messagesRequestsHoldingsOnly: false,
    messagesRequestsFollowersOnly: false,
    messagesRequestsFollowedOnly: false,
    pauseMessageUpdates: false,
    messageResponse: null,
    messageMeta: {
        decryptedMessgesMap: {},
        notificationMap: {}
    }
}

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessageNotificationCount: (state, action: PayloadAction<number>) => {
            state.messageNotificationCount = action.payload
        },
        setMessagesRequestsHoldersOnly: (state, action: PayloadAction<boolean>) => {
            state.messagesRequestsHoldersOnly = action.payload
        },
        setMessagesRequestsHoldingsOnly: (state, action: PayloadAction<boolean>) => {
            state.messagesRequestsHoldingsOnly = action.payload
        },
        setMessagesRequestsFollowersOnly: (state, action: PayloadAction<boolean>) => {
            state.messagesRequestsFollowersOnly = action.payload
        },
        setMessageRequestsFollowedOnly: (state, action: PayloadAction<boolean>) => {
            state.messagesRequestsFollowedOnly = action.payload
        },
        setMessagesSortAlgorithm: (state, action: PayloadAction<string>) => {
            state.messagesSortAlgorithm = action.payload
        },
        setMessageResponse: (state, action: PayloadAction<any>) => {
            state.messageResponse = action.payload
        },
        setNewMessagesFromPage: (state, action: PayloadAction<number>) => {
            state.newMessagesFromPage = action.payload
        },
        setMessageMeta: (state, action: PayloadAction<{
            decryptedMessgesMap: any,
            notificationMap: any
        }>) => {
            state.messageMeta = action.payload
        },
    }
})

// DEFINE ACTIONS 
export const { setMessageNotificationCount, setMessagesRequestsHoldersOnly, setMessagesRequestsHoldingsOnly,
setMessagesRequestsFollowersOnly, setMessageRequestsFollowedOnly, setMessagesSortAlgorithm,
setMessageResponse, setNewMessagesFromPage, setMessageMeta } = messagesSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default messagesSlice.reducer;