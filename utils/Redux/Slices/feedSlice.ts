import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostEntryResponse } from "../../backendapi-context";
import type { AppState } from "../store";

// Define 'all' feed related states here

// Define type
interface FeedState {
  postsToShow: PostEntryResponse[];
  followFeedPosts: PostEntryResponse[];
  hotFeedPosts: PostEntryResponse[];
}

// Define state
const initialState: FeedState = {
  postsToShow: [],
  followFeedPosts: [],
  hotFeedPosts: [],
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFollowFeedPosts: (state, action: PayloadAction<PostEntryResponse[]>) => {
      state.followFeedPosts = action.payload;
    },
    setHotFeedPosts: (state, action: PayloadAction<PostEntryResponse[]>) => {
      state.hotFeedPosts = action.payload;
    },
    setPostsToShow: (state, action: PayloadAction<PostEntryResponse[]>) => {
      state.postsToShow = action.payload;
    },
  },
});

// DEFINE ACTIONS
export const { setFollowFeedPosts, setHotFeedPosts, setPostsToShow } =
  feedSlice.actions;
// Not entirely sure on this ,,, This is how the docs describe it
// Other code such as selectors can use the imported `RootState` type
// Info: https://react-redux.js.org/tutorials/typescript-quick-start
// export const selectApp = (state: RootState) => state.app.loadingInitialAppState;

export default feedSlice.reducer;
