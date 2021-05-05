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
            state.user = null;

        },
        getOneUserSuccess: (state, action) => {
            state.specUser = action.payload;
        },
        deleteUserSuccess: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    }
})

export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getUsersSuccess, getOneUserSuccess, deleteUserSuccess } = slice.actions;
export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/users`);
        console.log(res.data)

        const arr = res.data.filter(i => i.id !== 4)
        console.log(arr);

        dispatch(getUsersSuccess(res.data));
    } catch (err) {
       console.log(err);
       //todo: Error
    }
}

export const getOneUser = (id) => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/users/${id}`);
        dispatch(getOneUserSuccess(res.data));
    } catch (err) {
        console.log(err);
        //todo: Error
    }
}

export const deleteUser = (id, token) => async dispatch => {
    try {
        const header = { headers: { Authorization: `Bearer ${token}` }}

        await axios.delete(`${config.url}/api/users/${id}`, header);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        console.log(err.response);
        //todo: Error
    }
}