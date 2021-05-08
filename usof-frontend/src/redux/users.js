import {createSlice} from "@reduxjs/toolkit";
import {config} from "../config";
import axios from "axios";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        specUser: null,
        error: null,
        isPending: false,
    },
    reducers: {
        getUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.user = null;

        },
        getOneUserSuccess: (state, action) => {
            state.specUser = action.payload;
            state.isPending = false;
        },
        getOneUserPending: (state, action) => {
            state.isPending = true;
            state.specUser = null;
        },
        deleteUserSuccess: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        createUserSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        createUserFailure: (state, action) => {
            state.user = null;
            state.error = action.payload;
        },
        editIMGFailure: (state, action) => {
            state.error = action.payload;
        }
    }
})

export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getUsersSuccess, getOneUserSuccess, deleteUserSuccess, createUserSuccess, createUserFailure, editIMGFailure, getOneUserPending } = slice.actions;
export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/users`);
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
       console.log(err);
       //todo: Error
    }
}

export const getOneUser = (id) => async dispatch => {
    try {
        dispatch(getOneUserPending())

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

export const createUser = (user, token, history) => async dispatch => {
    try {
        const header = { headers: { Authorization: `Bearer ${token}` }}

        const res = await axios.post(`${config.url}/api/users`, user, header);
        dispatch(createUserSuccess(res.data));
        history.push('/users');
    } catch (err) {
        dispatch(createUserFailure(err.response.data.error));
    }
}

export const editIMG = (img, token, history) => async dispatch => {
    try {
        const header = { headers: { Authorization: `Bearer ${token}` }}

        await axios.post(`${config.url}/api/users/avatar`, img, header);
        // dispatch(createUserSuccess(res.data));
        history.go(0);
    } catch (err) {
        console.log(err.response.data);
        dispatch(editIMGFailure(err.response.data));
    }
}