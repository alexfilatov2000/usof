import {createSlice} from "@reduxjs/toolkit";
import {config} from "../config";
import axios from "axios";
import {checkAndPutToken} from "../util/parseToken";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        isPending: false,
        token: checkAndPutToken()
    },
    reducers: {
        loginSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.user = action.payload.user;
            state.token = localStorage.getItem('token');
            state.error = null;
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
        },
        resetFailure: (state, action) => {
            state.error = action.payload;
            state.isPending = false;
        },
        resetSuccess: (state, action) => {
            state.error = null;
            state.isPending = false;
        },
        resetPending: (state, action) => {
            state.isPending = true;
        },
        newPswFailure: (state, action) => {
            state.error = action.payload;
        },
        VerifyEmailFailure: (state, action) => {
            state.error = action.payload;
        }
    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { loginSuccess, loginFailure, logOut, registerSuccess, registerFailure, resetFailure, resetSuccess, resetPending, newPswFailure, VerifyEmailFailure} = slice.actions;
export const fetchLogin = (user, history) => async dispatch => {
    try {
        const res = await axios.post(`${config.url}/api/auth/login`, user);
        dispatch(loginSuccess({user: res.data.user, token: res.data.token}));
        history.push('/');
    } catch (err) {
        dispatch(loginFailure(err.response.data.error))
    }
}

export const fetchLogOut = () => async dispatch => {
    dispatch(logOut());
}

export const fetchRegister = (user, history) => async dispatch => {
    try {
        await axios.post(`${config.url}/api/auth/register`, user);
        dispatch(registerSuccess());
        history.push('/login');
    } catch (err) {
        dispatch(registerFailure(err.response.data.error))
    }
}

export const fetchReset = (user, history) => async dispatch => {
    try {
        dispatch(resetPending())
        await axios.post(`${config.url}/api/auth/password-reset`, user);

        dispatch(resetSuccess());
        history.push('/login');
    } catch (err) {
        dispatch(resetFailure(err.response.data.error))
    }
}

export const fetchNewPsw = (user, history, token) => async dispatch => {
    try {
        await axios.post(`${config.url}/api/auth/password-reset/${token}`, user);
        history.push('/login');
    } catch (err) {
        dispatch(newPswFailure(err.response.data.error))
    }
}

export const fetchVerifyEmail = (token) => async dispatch => {
    try {
        await axios.get(`${config.url}/api/auth/verify-email/${token}`);
        // dispatch(VerifyEmailSuccess(err.response.data.error))
    } catch (err) {
        // console.log(err.response.data.error)
        dispatch(VerifyEmailFailure(err.response.data.error))
    }
}