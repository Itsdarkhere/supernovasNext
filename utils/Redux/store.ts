import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import sortReducer from "./Slices/sortSlice";
import profileReducer from "./Slices/profileSlice";
import otherReducer from "./Slices/otherSlice";
import openReducer from "./Slices/openSlice";
import nodeReducer from "./Slices/nodeSlice";
import messagesReducer from "./Slices/messagesSlice";
import marketplaceReducer from "./Slices/marketplaceSlice";
import loggedInReducer from "./Slices/loggedInSlice";
import imxReducer from "./Slices/imxSlice";
import followsReducer from "./Slices/followsSlice";
import feesReducer from "./Slices/feesSlice";
import feedReducer from "./Slices/feedSlice";
import exhangeRatesReducer from "./Slices/exhangeRatesSlice";
import appReducer from "./Slices/appSlice";
import { createWrapper } from "next-redux-wrapper";

export function makeStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            sort: sortReducer,
            profile: profileReducer,
            other: otherReducer,
            open: openReducer,
            node: nodeReducer,
            messages: messagesReducer,
            marketplace: marketplaceReducer,
            loggedIn: loggedInReducer,
            imx: imxReducer,
            follows: followsReducer,
            fees: feesReducer,
            feed: feedReducer,
            exhange: exhangeRatesReducer,
            app: appReducer,
        }
    });
}

const store = makeStore();

// Needed for TS redux
export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store;