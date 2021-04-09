import {Types} from "../types/actionTypes";

const initialState = {
    user: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_USERS_SUCCESS:
            return {
                ...state,
                user: action.payload,
            }
        case Types.FETCH_USERS_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default: return state
    }
}

export default reducer;