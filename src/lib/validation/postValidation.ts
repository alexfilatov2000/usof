import { Post } from '../../entity/post';
import { sendErr } from '../interfaces/userInterface';
import { createPostSchema, createCommentSchema, createLikeSchema, updatePostSchema } from '../joi/joiShemaPost';

export const createPostVal = (bodyData: Post): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = createPostSchema.validate(bodyData);

    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else {
        return newErr;
    }
};

export const createCommentVal = (bodyData: Post): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = createCommentSchema.validate(bodyData);

    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else {
        return newErr;
    }
};

export const createLikeVal = (bodyData: Post): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = createLikeSchema.validate(bodyData);

    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else {
        return newErr;
    }
};

export const updatePostVal = (bodyData: any, post: Post): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = updatePostSchema.validate(bodyData);

    if (!post) {
        newErr.status = 400;
        newErr.body = { error: 'No post found' };
        return newErr;
    } else if (post.user_id !== bodyData.userByToken.id) {
        newErr.status = 400;
        newErr.body = "You don't have access for that";
        return newErr;
    } else if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else {
        return newErr;
    }
};
