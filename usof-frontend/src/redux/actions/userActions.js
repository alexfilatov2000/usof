import { Types } from '../types/actionTypes';
import { config } from "../../config";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Login**/

export const fetchLogin = (user, history) => {
    return async (dispatch) => {
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
            dispatch(loginSuccess(result.user, result.token));
            history.push('/');
        }
    }
}

export const loginSuccess = (user, token) => ({
    type: Types.FETCH_USERS_SUCCESS,
    payload: user,
    token
})

export const loginFailure = error => ({
    type: Types.FETCH_USERS_FAILURE,
    payload: error
})

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @LogOut**/

export const fetchLogOut = () => {
    return (dispatch) => {
        dispatch(logOutSuccess())
    }
}

const logOutSuccess = () => ({
    type: Types.LOG_OUT_SUCCESS,
})

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Register**/

export const fetchRegister = (user, history) => {
    return async (dispatch) => {
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
}

export const registerFailure = error => ({
    type: Types.FETCH_USERS_FAILURE,
    payload: error
})

export const registerSuccess = () => ({
    type: Types.FETCH_REGISTER_SUCCESS,
})

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */