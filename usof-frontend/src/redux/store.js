import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import users from "./users";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
})

export default configureStore({
    reducer: {users},
    middleware: middleware,
    devTools: true
})