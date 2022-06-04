import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../backendapi-context";
import { LoggedInUserObservableResult } from "../../observable-results/logged-in-user-observable-result";
import { Observable, Observer } from "rxjs";
import type { RootState } from "../store";

// Define loggedIn related states here

// Define type
interface LoggedInState {
    loggedInUser: User;
    userList: User[],
    loggedInUserObservable:  Observable<LoggedInUserObservableResult>,
    loggedInUserObservers: Observer<LoggedInUserObservableResult>[],
    profileUpdateTimestamp: number,
}

// Define state
const initialState: LoggedInState = {
    loggedInUser: null,
    userList: [],
    loggedInUserObservable:  undefined,
    loggedInUserObservers: [],
    profileUpdateTimestamp: null,
}

export const loggedInSlice = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        setLoggedInUserState: (state, action: PayloadAction<User>) => {
            state.loggedInUser = action.payload
        },
        setLoggedInUserReferralInfoResponses: (state, action: PayloadAction<any>) => {
            state.loggedInUser.ReferralInfoResponses = action.payload
        },
        setUserList: (state, action: PayloadAction<User[]>) => {
            state.userList = action.payload
        },
        setLoggedInUserObservable: (state, action: PayloadAction<Observable<LoggedInUserObservableResult>>) => {
            state.loggedInUserObservable = action.payload
        },
        setLoggedInUserObservers: (state, action: PayloadAction<Observer<LoggedInUserObservableResult>[]>) => {
            state.loggedInUserObservers = action.payload
        },
        pushToLoggedInUserObservers: (state, action: PayloadAction<Observer<LoggedInUserObservableResult>>) => {
            state.loggedInUserObservers = state.loggedInUserObservers.concat(...state.loggedInUserObservers, action.payload);
        },
        setProfileUpdateTimestamp: (state, action: PayloadAction<number>) => {
            state.profileUpdateTimestamp = action.payload
        },
        
        
    }
})

// DEFINE ACTIONS 
export const { setLoggedInUserState, setLoggedInUserReferralInfoResponses, setUserList, setLoggedInUserObservable, 
    setLoggedInUserObservers, pushToLoggedInUserObservers, setProfileUpdateTimestamp } = loggedInSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default loggedInSlice.reducer;