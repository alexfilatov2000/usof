import {createSlice} from "@reduxjs/toolkit";
import {config} from "../config";
import axios from "axios";
import {convertDate} from "../util/convertDate";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        specPost: null,
    },
    reducers: {
        getAllPostsSuccess: (state, action) => {
            state.posts = action.payload;
        },
        getOnePostSuccess: (state, action) => {
            state.specPost = action.payload;
        },
    }

})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const { getAllPostsSuccess, getOnePostSuccess } = slice.actions;
export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/posts`);
        const users = await axios.get(`${config.url}/api/users/`);

        convertDate(res.data);

        res.data.map(post => {
            post.user = users.data.find(u => u.id === post.user_id)
        })

        dispatch(getAllPostsSuccess(res.data));

    } catch (err) {
        // dispatch(loginFailure(err.response.data.error))
    }
}

export const getOnePost = (id) => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/posts/${id}`);
        convertDate(res.data);
        dispatch(getOnePostSuccess(res.data));
    } catch (e) {
        //
    }
}