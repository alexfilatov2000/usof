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
        error: { msg: null, title: false, description: false },
        success: false,
        openSuccess: false,
        openError: false,
    },
    reducers: {
        getAllCategoriesSuccess: (state, action) => {
            state.categories = action.payload;
            state.error = { msg: null, title: false, description: false }
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
    }
})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const {getAllCategoriesSuccess, createCategoryFailure, createCategorySuccess, onCloseSuccess , onCloseError} = slice.actions;

export const getAllCategories = () => async dispatch => {
    try {
        const categories = await axios.get(`${config.url}/api/categories`);
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