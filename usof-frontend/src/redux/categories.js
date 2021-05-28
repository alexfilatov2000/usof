import {createSlice} from "@reduxjs/toolkit";
import {config} from "../config";
import axios from "axios";
import {convertDate} from "../util/convertDate";
import {likesCnt} from "../util/getLikesToPostCnt";
import {parseJwt} from "../util/parseToken";
import { errType } from "../util/getErrDataType";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        specCategory: null,
        postsByCategory: [],
        error: { msg: null, title: false, description: false },
        success: false,
        openSuccess: false,
        openError: false,
    },
    reducers: {
        getAllCategoriesSuccess: (state, action) => {
            state.categories = action.payload;
            state.error = { msg: null, title: false, description: false };
            state.specCategory = null;
            state.postsByCategory = [];
        },
        createCategoryFailure: (state, action) => {
            state.error = action.payload;
            state.openError = true;
        },
        createCategorySuccess: (state, action) => {
            state.error = { msg: null, title: false, description: false };
            state.success = true;
            state.openSuccess = true;
        },
        onCloseSuccess: (state, action) => {
            state.openSuccess = false;
        },
        onCloseError: (state, action) => {
            state.openError = false;
        },
        getSpecCategorySuccess: (state, action) => {
            state.specCategory = action.payload;
        },
        getPostsByCategorySuccess: (state, action) => {
            state.postsByCategory = action.payload;
        },
    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const {
    getAllCategoriesSuccess,
    createCategoryFailure,
    createCategorySuccess,
    onCloseSuccess,
    getSpecCategorySuccess,
    getPostsByCategorySuccess,
    onCloseError } = slice.actions;

export const getAllCategories = () => async dispatch => {
    try {
        const categories = await axios.get(`${config.url}/api/categories`);

        let arr = [];
        for (let val of categories.data) {
            const postsInCategories = await axios.get(`${config.url}/api/categories/${val.id}/posts`);
            val.cntOfPosts = postsInCategories.data.length;
        }

        console.log(categories.data);


        dispatch(getAllCategoriesSuccess(categories.data));

    } catch (err) {
        console.log(err)
        // dispatch(loginFailure(err.response.data.error))
    }
}

export const createCategory = (data, token, history, set) => async dispatch => {
    try {
        const header = { headers: { Authorization: `Bearer ${token}` }}
        await axios.post(`${config.url}/api/categories`, data, header);

        dispatch(createCategorySuccess());
        set.setTitle('');
        set.setDescription('');
    } catch (err) {
        let type = errType(err.response.data.error);

        const types = {title: false, description: false};
        if (type === 'title') types.title = true;
        if (type === 'description') types.description = true;

        const error = {
            msg: err.response.data.error,
            title: types.title,
            description: types.description,
        }

        dispatch(createCategoryFailure(error))
    }
}
export const closeSuccess = () => async dispatch => {
    dispatch(onCloseSuccess());
}

export const closeError = () => async dispatch => {
    dispatch(onCloseError());
}

export const getSpecCategory = (id) => async dispatch => {
    try {
        const category = await axios.get(`${config.url}/api/categories/${id}`);
        dispatch(getSpecCategorySuccess(category.data));
    } catch (err) {
        console.log(err.response)
    }

}

export const getPostsByCategory = (id) => async dispatch => {
    try {
        const posts = await axios.get(`${config.url}/api/categories/${id}/posts`);
        const users = await axios.get(`${config.url}/api/users/`);

        convertDate(posts.data);
        //add users
        posts.data.map(async post => {
            post.user = users.data.find(u => u.id === post.user_id)
        })

        //add likes
        for (let val of posts.data) {
            let likes = await axios.get(`${config.url}/api/posts/${val.id}/like`);
            val.likesCnt = likesCnt(likes.data);
        }

        //add answers
        for (let val of posts.data) {
            let comments = await axios.get(`${config.url}/api/posts/${val.id}/comments`);
            val.commentsCnt = comments.data.length;
        }
        dispatch(getPostsByCategorySuccess(posts.data));
    } catch (err) {
        console.log(err.response)
    }

}