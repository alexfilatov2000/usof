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
        openDialog: false
    },
    reducers: {
        getUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.user = null;
            state.specUser = null;
        },
        getOneUserSuccess: (state, action) => {
            state.specUser = action.payload;
            state.error = null;
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
        },
        editIMGSuccess: (state, action) => {
            state.specUser.profile_picture = action.payload;
            state.openDialog = false;
            state.error = null;
        },
        removeSpecUserSuccess: (state, action) => {
            state.specUser = null;
        },
        updateFullNameFailure: (state, action) => {
            state.error = action.payload;
        },
        dialogOpenSuccess: (state, action) => {
            state.openDialog = true;
            state.error = null;
        },
        dialogCloseSuccess: (state, action) => {
            state.openDialog = false;
            state.error = null;
        },
    }
})

export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getUsersSuccess, getOneUserSuccess, deleteUserSuccess, createUserSuccess, createUserFailure, editIMGFailure, editIMGSuccess, removeSpecUserSuccess, updateFullNameFailure, dialogOpenSuccess, dialogCloseSuccess } = slice.actions;
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

export const editIMG = (img, token) => async dispatch => {
    try {
        const header = { headers: { Authorization: `Bearer ${token}` }}
        const res = await axios.post(`${config.url}/api/users/avatar`, img, header);

        console.log(res.data)
        dispatch(editIMGSuccess(res.data));
    } catch (err) {
        console.log(err.response.data);
        dispatch(editIMGFailure(err.response.data));
    }
}

export const removeSpecUser = () => async dispatch => {
    try {
        dispatch(removeSpecUserSuccess());
    } catch (err) {
        console.log(err);
    }
}

export const updateFullName = (full_name, id, token, history) => async dispatch => {
    try {
        console.log(token);
        const header = { headers: { Authorization: `Bearer ${token}` }}
        await axios.patch(`${config.url}/api/users/full_name/${id}`, { full_name }, header);

        history.push('/');
    } catch (err) {
        dispatch(updateFullNameFailure(err.response.data.error));
    }
}

export const updateLogin = (login, id, token, history) => async dispatch => {
    try {
        console.log(token);
        const header = { headers: { Authorization: `Bearer ${token}` }}
        await axios.patch(`${config.url}/api/users/login/${id}`, { login }, header);

        history.push('/');
    } catch (err) {
        dispatch(updateFullNameFailure(err.response.data.error));
    }
}

export const updatePassword = (oldPassword, newPassword, id, token, history) => async dispatch => {
    try {
        console.log(token);
        const header = { headers: { Authorization: `Bearer ${token}` }}
        await axios.patch(`${config.url}/api/users/password/${id}`, { oldPassword, newPassword }, header);

        history.push('/');
    } catch (err) {
        dispatch(updateFullNameFailure(err.response.data.error));
    }
}

export const dialogOpen = () => async dispatch => {
    dispatch(dialogOpenSuccess())
}

export const dialogClose = () => async dispatch => {
    dispatch(dialogCloseSuccess())
}

