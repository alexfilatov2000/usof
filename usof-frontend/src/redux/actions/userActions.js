import { Types } from '../types/actionTypes';
import { config } from "../../config";

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
            dispatch(loginSuccess(result.user));
            history.push('/');
        }
    }
}


export const loginSuccess = user => ({
    type: Types.FETCH_USERS_SUCCESS,
    payload: user
})

export const loginFailure = error => ({
    type: Types.FETCH_USERS_FAILURE,
    payload: error
})