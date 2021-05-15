// import {createSlice} from "@reduxjs/toolkit";
// import {config} from "../config";
// import axios from "axios";
// import {likesCnt} from "../util/getLikesToPostCnt";
// import {convertDate} from "../util/convertDate";
//
// /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
// /** @Reducers**/
//
// const slice = createSlice({
//     name: 'comments',
//     initialState: {
//         likesVal: null,
//     },
//     reducers: {
//         getOneCommentSuccess: (state, action) => {
//             state.likesVal = action.payload;
//         }
//     }
// })
//
// export default slice.reducer;
//
// /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
// /** @Actions**/
//
// const { getOneCommentSuccess } = slice.actions;
//
// export const getOneComment = (id) => async dispatch => {
//     try {
//
//         const comment = await axios.get(`${config.url}/api/comments/${id}`);
//         const likes = await axios.get(`${config.url}/api/comments/${id}/like`);
//
//         // comment.data.likesVal = likesCnt(likes.data);
//         let cnt = likesCnt(likes.data);
//         // console.log(comment);
//
//         dispatch(getOneCommentSuccess(cnt));
//     } catch (err) {
//         // dispatch(loginFailure(err.response.data.error))
//     }
// }
