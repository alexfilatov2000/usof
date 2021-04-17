import {createSlice} from "@reduxjs/toolkit";
import {config} from "../config";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
        token: localStorage.getItem('token')
    },
    reducers: {
        loginSuccess: (state, action) => {
            console.log(action);
            localStorage.setItem('token', action.payload.token);
            state.user = action.payload.user;
            state.token = localStorage.getItem('token');
        },
        loginFailure : (state, action) => {
            state.user = null;
            state.token = null;
            state.error = action.payload;
        },
        logOut: (state, action) => {
            localStorage.removeItem('token');
            state.token = null;
        },
        registerSuccess: (state, action) => {
            state.user = null;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.user = null;
            state.error = action.payload;
        }
    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { loginSuccess, loginFailure, logOut, registerSuccess, registerFailure } = slice.actions;
export const fetchLogin = (user, history) => async dispatch => {
    let res = await fetch(`${config.url}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await res.json();

    if(!res.ok) {
        dispatch(loginFailure(result.error))
    } else {
        dispatch(loginSuccess({user: result.user, token: result.token}));
        history.push('/');
    }
}

export const fetchLogOut = () => async dispatch => {
    dispatch(logOut());
}

export const fetchRegister = (user, history) => async dispatch => {
    let res = await fetch(`${config.url}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    let result = await res.json();
    if(!res.ok){
        dispatch(registerFailure(result.error))
    } else {
        dispatch(registerSuccess())
        await history.push('/login');
    }
}