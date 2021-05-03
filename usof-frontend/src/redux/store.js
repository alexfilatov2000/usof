import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import auth from "./auth";
import users from "./users"

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
})

export default configureStore({
    reducer: {auth, users},
    middleware: middleware,
    devTools: true
})