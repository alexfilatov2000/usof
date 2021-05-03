import {createSlice} from "@reduxjs/toolkit";
import {config} from "../config";
import axios from "axios";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        specUser: null
    },
    reducers: {
        getUsersSuccess: (state, action) => {
            state.users = action.payload;
        },
        getOneUserSuccess: (state, action) => {
            state.specUser = action.payload;
        }
    }
})

export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getUsersSuccess, getOneUserSuccess } = slice.actions;
export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/users`);
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
       console.log(err.response.data);
       //todo: Error
    }
}

export const getOneUser = (id) => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/users/${id}`);
        dispatch(getOneUserSuccess(res.data));
    } catch (err) {
        console.log(err.response.data);
        //todo: Error
    }
}