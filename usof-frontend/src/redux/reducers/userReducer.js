import {Types} from "../types/actionTypes";

const initialState = {
    user: null,
    error: null,
    token: localStorage.getItem('token')
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_USERS_SUCCESS:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                user: action.payload,
                token: localStorage.getItem('token')
            }
        case Types.FETCH_USERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                token: null
            }
        case Types.LOG_OUT_SUCCESS:
        case Types.FETCH_REGISTER_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                error: null,
                user: null,
                token: null
            }
        default: return state
    }
}

export default reducer;