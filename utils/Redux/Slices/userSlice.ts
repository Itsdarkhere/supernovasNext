import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BalanceEntryResponse } from "../../backendapi-context";
import type { RootState } from "../store";

// Define User related states here

// Define type
interface UserState {
    // The coin balance and user profiles of the coins the the user
    // hodls and the users who hodl him.
    youHodlMap: { [k: string]: BalanceEntryResponse },
    // Map of diamond level to deso nanos.
    diamondLevelMap: {},
    //   isCreator boolean
    isCreator: boolean,
    //   isCollector boolean
    isCollector: boolean,
    //   isVerified boolean
    isVerified: boolean,
    //   isVerifiedRes
    isVerifiedRes: any,
    //   isVerifiedStrBool
    isVerifiedStrBool: string,
    //   username
    username: any,
    //   isNullUsername
    isNullUsername: boolean,
    //   isNullUsernameRes
    isNullUsernameRes: any,
    //   isOnboardingComplete
    isOnboardingComplete: boolean,
    //   wantToVerifyPhone
    wantToVerifyPhone: boolean,
    //   phoneVerified
    phoneVerified: boolean,
    needToPickCreatorOrCollector: boolean,
}

// Define state
const initialState: UserState = {
    youHodlMap: {},
    diamondLevelMap: {},
    isCreator: false,
    isCollector: false,
    isVerified: false,
    isVerifiedRes: undefined,
    isVerifiedStrBool: null,
    username: null,
    isNullUsername: false,
    isNullUsernameRes: false,
    isOnboardingComplete: false,
    wantToVerifyPhone: false,
    phoneVerified: false,
    needToPickCreatorOrCollector: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsCreator: (state, action: PayloadAction<boolean>) => {
            state.isCreator = action.payload;
        },
        setIsCollector: (state, action: PayloadAction<boolean>) => {
            state.isCollector = action.payload;
        },
        setPhoneVerified: (state, action: PayloadAction<boolean>) => {
            state.phoneVerified = action.payload;
        },
        setNeedToPickCreatorOrCollector: (state, action: PayloadAction<boolean>) => {
            state.needToPickCreatorOrCollector = action.payload;
        },
        setUsername: (state, action: PayloadAction<any>) => {
            state.username = action.payload;
        },
        setIsNullUsername: (state, action: PayloadAction<boolean>) => {
            state.isNullUsername = action.payload;
        },
        setIsNullUsernameRes: (state, action: PayloadAction<any>) => {
            state.isNullUsernameRes = action.payload;
        },
        setIsVerifiedRes: (state, action: PayloadAction<any>) => {
            state.isVerifiedRes = action.payload
        },
        setIsVerified: (state, action: PayloadAction<boolean>) => {
            state.isVerified = action.payload
        },
        setIsVerifiedStrBool: (state, action: PayloadAction<string>) => {
            state.isVerifiedStrBool = action.payload
        },
        setIsOnBoardingComplete: (state, action: PayloadAction<boolean>) => {
            state.isOnboardingComplete = action.payload
        },
        setYouHodlMap: (state, action: PayloadAction<{ [k: string]: BalanceEntryResponse }>) => {
            state.youHodlMap = action.payload;
        },
        createYouHodlMap: (state, action: PayloadAction<BalanceEntryResponse[]>) => {
            for (const entry of action.payload || []) {
                state.youHodlMap[entry.CreatorPublicKeyBase58Check] = entry;
              }
        },
        setDiamondLevelMap: (state, action: PayloadAction<{}>) => {
            state.diamondLevelMap = action.payload;
        }

        
    }
})

// DEFINE ACTIONS 
export const { setIsCreator, setIsCollector, setPhoneVerified, setNeedToPickCreatorOrCollector, setUsername, setIsNullUsername,
    setIsNullUsernameRes, setIsVerifiedRes, setIsVerified, setIsVerifiedStrBool, setIsOnBoardingComplete, setYouHodlMap,
    setDiamondLevelMap, createYouHodlMap } = userSlice.actions;

// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default userSlice.reducer;