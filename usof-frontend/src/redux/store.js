import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import auth from "./auth";
import users from "./users"
import posts from "./posts"
import categories from "./categories";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
})

export default configureStore({
    reducer: { auth, users, posts, categories },
    middleware: middleware,
    devTools: true
})