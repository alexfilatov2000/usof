import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import auth from "./auth";
import users from "./users"
import posts from "./posts"

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
})

export default configureStore({
    reducer: {auth, users, posts},
    middleware: middleware,
    devTools: true
})