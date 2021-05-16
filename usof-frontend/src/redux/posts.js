import {createSlice} from "@reduxjs/toolkit";
import {config} from "../config";
import axios from "axios";
import {convertDate} from "../util/convertDate";
import {likesCnt} from "../util/getLikesToPostCnt";
import {parseJwt} from "../util/parseToken";
import {errType} from "../util/getErrDataType";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Reducers**/

const slice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        comments: [],
        specPost: null,
        specCommentLikes: null,
        plus: false,
        minus: false,
        error: null,
        commentAdded: false,
        postErr: {msg: null, title: false, content: false, categories: false}
    },
    reducers: {
        getAllPostsSuccess: (state, action) => {
            state.posts = action.payload;
            state.specPost = null;
            state.comments = [];
            state.error = null;
        },
        getOnePostSuccess: (state, action) => {
            state.specPost = action.payload.post;
            state.plus = action.payload.plus;
            state.minus = action.payload.minus;
            state.comments = action.payload.comments;
            state.error = null;
        },
        plusLikeSuccess: (state, action) => {
            state.specPost.likesVal += action.payload;
            state.plus = true;
            state.minus = false;
        },
        plusLikeDeletedSuccess: (state, action) => {
            state.specPost.likesVal -= action.payload;
            state.plus = false;
            state.minus = false;
        },
        minusLikeSuccess: (state, action) => {
            state.specPost.likesVal -= action.payload;
            state.minus = true;
            state.plus = false;
        },
        minusLikeDeletedSuccess: (state, action) => {
            state.specPost.likesVal += action.payload;
            state.minus = false;
            state.plus = false;
        },
        plusLikeToCommentSuccess: (state, action) => {
            state.comments = action.payload;
        },
        deleteLikeToCommentSuccess: (state, action) => {
            state.comments = action.payload;
        },
        createCommentFailure: (state, action) => {
            state.error = action.payload;
        },
        createCommentSuccess: (state, action) => {
            state.commentAdded = true;
        },
        deletePostSuccess: (state, action) => {
            state.specPost = null;
        },
        createPostFailure: (state, action) => {
            state.postErr = action.payload;
        },
        createPostSuccess: (state, action) => {
            state.postErr = {msg: null, title: false, content: false}
        },
    }

})
export default slice.reducer;

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */
/** @Actions**/

const {
    getAllPostsSuccess,
    getOnePostSuccess,
    plusLikeSuccess,
    minusLikeSuccess,
    plusLikeDeletedSuccess,
    minusLikeDeletedSuccess,
    plusLikeToCommentSuccess,
    createCommentFailure,
    createCommentSuccess,
    deletePostSuccess,
    createPostFailure,
    createPostSuccess,
    deleteLikeToCommentSuccess } = slice.actions;

export const getAllPosts = () => async dispatch => {
    try {
        const posts = await axios.get(`${config.url}/api/posts`);
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

        dispatch(getAllPostsSuccess(posts.data));

    } catch (err) {
        // dispatch(loginFailure(err.response.data.error))
    }
}

export const getOnePost = (id, token) => async dispatch => {
    try {
        token = parseJwt(token);
        const res = await axios.get(`${config.url}/api/posts/${id}`);
        const likes = await axios.get(`${config.url}/api/posts/${id}/like`);
        const categories = await axios.get(`${config.url}/api/posts/${id}/categories`);
        const comments = await axios.get(`${config.url}/api/posts/${id}/comments`);
        if (comments.status !== 204) convertDate(comments.data);

        for (let val of comments.data) {
            const commentLikes = await axios.get(`${config.url}/api/comments/${val.id}/like`);
            val.likesCnt = likesCnt(commentLikes.data);
            val.minus = false;
            val.plus = false;

            if (commentLikes.data !== "" && token){
                let find = commentLikes.data.find(f => f.user_id === token.user.id && f.comment_id === val.id)
                if (find && find.type === 'like') val.plus = true;
                if (find && find.type === 'dislike') val.minus = true;
            }
        }

        res.data.likesVal = likesCnt(likes.data);
        if (categories.data.length > 0) res.data.categories = categories.data

        convertDate(res.data);

        let plusFlag = false;
        let minusFlag = false;
        if (token && likes.data) {
            const like = likes.data.find(l => l.user_id === token.user.id);
            if (like && like.type === 'like') plusFlag = true;
            if (like && like.type === 'dislike') minusFlag = true;
        }

        // setTimeout(() => {
            dispatch(getOnePostSuccess({post: res.data, comments: comments.data, plus: plusFlag, minus: minusFlag}));
        // }, 1000)

    } catch (e) {
        //
    }
}

export const addLike = (id, token) => async dispatch => {
    try {
        const data = {type: 'like'};
        const header = { headers: { Authorization: `Bearer ${token}` }}
        const body = await axios.post(`${config.url}/api/posts/${id}/like`, data, header);

        if (body.status === 201) {
            dispatch(plusLikeSuccess(body.data));
        } else {
            dispatch(plusLikeDeletedSuccess(body.data));
        }

    } catch (e) {
        console.log(e.response)
    }
}

export const deleteLike = (id, token) => async dispatch => {
    try {
        const data = {type: 'dislike'};
        const header = { headers: { Authorization: `Bearer ${token}` }}
        const body = await axios.post(`${config.url}/api/posts/${id}/like`, data, header);

        if (body.status === 201) {
            dispatch(minusLikeSuccess(body.data));
        } else {
            dispatch(minusLikeDeletedSuccess(body.data));
        }
    } catch (e) {
        console.log(e.response)
    }
}

export const addLikeToComment = (id, post_id, token, comments) => async dispatch => {
    try {
        //copy comments
        let commentsCopy = JSON.parse(JSON.stringify(comments));
        const data = { type: 'like' };
        const header = { headers: { Authorization: `Bearer ${token}` }}
        const body = await axios.post(`${config.url}/api/comments/${id}/like`, data, header);

        if (body.status === 201) {
            commentsCopy.map(i => {
                if (i.id === id) {
                    i.likesCnt += body.data;
                    i.plus = true;
                    i.minus = false;
                }
            });
        } else {
            commentsCopy.map(i => {
                if (i.id === id) {
                    i.likesCnt -= body.data;
                    i.plus = false;
                    i.minus = false;
                }
            });
        }

        dispatch(plusLikeToCommentSuccess(commentsCopy));

    } catch (e) {
        console.log(e)
    }
}

export const deleteLikeToComment = (id, post_id, token, comments) => async dispatch => {
    try {
        let commentsCopy = JSON.parse(JSON.stringify(comments));
        const data = { type: 'dislike' };
        const header = { headers: { Authorization: `Bearer ${token}` }}
        const body = await axios.post(`${config.url}/api/comments/${id}/like`, data, header);

        if (body.status === 201) {
            commentsCopy.map(i => {
                if (i.id === id) {
                    i.likesCnt -= body.data;
                    i.plus = false;
                    i.minus = true;
                }
            });
        } else {
            commentsCopy.map(i => {
                if (i.id === id) {
                    i.likesCnt += body.data;
                    i.plus = false;
                    i.minus = false;
                }
            });
        }

        dispatch(deleteLikeToCommentSuccess(commentsCopy));

    } catch (e) {
        console.log(e)
    }
}

export const createComment = (token, post_id, data, history, setOpen) => async dispatch => {
    try {
        const content = {content: data};
        const header = { headers: { Authorization: `Bearer ${token}` }}
        await axios.post(`${config.url}/api/posts/${post_id}/comments`, content, header);
        history.go(0);

        dispatch(createCommentSuccess())
    } catch (err) {
        setOpen(true);
        dispatch(createCommentFailure(err.response.data.error))
    }
}

export const deletePost = (post_id, token, history) => async dispatch => {
    try {
        const header = { headers: { Authorization: `Bearer ${token}` }}
        await axios.delete(`${config.url}/api/posts/${post_id}`, header);
        dispatch(deletePostSuccess())

        history.push('/posts');
    } catch (err) {
        console.log(err.response)
        //dispatch(createUserFailure(err.response.data.error))
    }
}

export const createPost = (data, token, history, setOpen) => async dispatch => {
    try {
        const header = { headers: { Authorization: `Bearer ${token}` }}
        await axios.post(`${config.url}/api/posts`, data, header);
        dispatch(createPostSuccess())

        history.push('/posts');
    } catch (err) {
        setOpen(true);
        let type = errType(err.response.data.error);

        const types = {title: false, content: false, categories: false};
        if (type === 'title') types.title = true;
        if (type === 'content') types.content = true;
        if (type === 'categories') types.categories = true;

        const error = {
            msg: err.response.data.error,
            title: types.title,
            content: types.content,
            categories: types.categories,
        }

        dispatch(createPostFailure(error))
    }
}