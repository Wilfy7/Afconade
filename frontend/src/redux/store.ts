import { configureStore } from "@reduxjs/toolkit";
import { apiMatchesSlice } from "./slices/apimatches";



export const store = configureStore({
    reducer: {
      //apiMatches: apiMatchesReducer,
      matches: apiMatchesSlice.reducer,
    },
});

//Infer the `RootState´ and `AppDispatch´ types from the store itself
export type RootState = ReturnType<typeof store.getState>;
//Infered type: {posts: PostsState, commentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;