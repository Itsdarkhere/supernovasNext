import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Observable, Observer } from "rxjs";
import { FollowChangeObservableResult } from "../../observable-results/follow-change-observable-result";
import type { RootState } from "../store";

// Define follows related states here

// Define type
interface messagesState {
    followChangeObservable: Observable<FollowChangeObservableResult>,
    followChangeObservers: Observer<FollowChangeObservableResult>[],
}

// Define state
const initialState: messagesState = {
    followChangeObservable: undefined,
    followChangeObservers: [],
}

export const followsSlice = createSlice({
    name: "follows",
    initialState,
    reducers: {
        setFollowChangeObservable: (state, action: PayloadAction<Observable<FollowChangeObservableResult>>) => {
            state.followChangeObservable = action.payload;
        },
        pushToFollowChangeObservers: (state, action: PayloadAction<Observer<FollowChangeObservableResult>>) => {
            state.followChangeObservers = state.followChangeObservers.concat(...state.followChangeObservers, action.payload);
        },
    }
})

// DEFINE ACTIONS 
export const { setFollowChangeObservable, pushToFollowChangeObservers } = followsSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default followsSlice.reducer;