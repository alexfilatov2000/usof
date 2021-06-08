import { createLikeSchema, createCommentSchema } from '../lib/joi/joiShemaPost';
import { findOneUserById } from '../models/userModels';
import { CustomError } from '../lib/hadleErrors/handleErrror';
import { Comment } from '../entity/comment';
import { Like_to_comment } from '../entity/like_to_comment';
import { User } from '../entity/user';
import {
    findOneCommentModel,
    findLikesModel,
    createLikeModel,
    updateUserRatingModel,
    updateCommentModel,
    deleteCommentModel,
    findOneLikeUnderComment,
    deleteLikeUnderComment,
} from '../models/commentModels';

export const getCommentService = async (id: number): Promise<Comment> => {
    const comment = await findOneCommentModel(id);
    if (!comment) throw new CustomError('No category found', 204);
    return comment;
};

export const getLikesService = async (id: number): Promise<Like_to_comment[]> => {
    const likes = await findLikesModel(id);
    if (!likes.length) throw new CustomError('No like found', 204);
    return likes;
};

export const crateLikeService = {
    create: async (id: number, user: User, bodyData: Like_to_comment): Promise<any> => {
        const { error } = createLikeSchema.validate(bodyData);
        if (error) throw new CustomError(error.message, 400);

        const comment = await findOneCommentModel(id);
        if (!comment) throw new CustomError('No comment found', 204);

        const like = await findOneLikeUnderComment(id, user.id);

        if (!like) {
            await createLikeModel(id, user, bodyData);
            if (bodyData.type === 'like') {
                return { status: 201, val: 1, add: 1 };
            } else {
                return { status: 201, val: 1, add: -1 };
            }
        } else {
            if (like.type === bodyData.type){
                await deleteLikeUnderComment(like.id);
                if (bodyData.type === 'like') {
                    return { status: 200, val: 1, add: -1 };
                } else {
                    return { status: 200, val: 1, add: 1 };
                }
            } else {
                await deleteLikeUnderComment(like.id);
                await createLikeModel(id, user, bodyData);
                if (bodyData.type === 'like') {
                    return { status: 201, val: 2, add: 2 };
                } else {
                    return { status: 201, val: 2, add: -2 };
                }
            }
        }


    },
    updateRating: async (comment_id: number, bodyData: Like_to_comment, data: any): Promise<void> => {
        const comment = await findOneCommentModel(comment_id);
        const user = await findOneUserById(comment.user_id);
        const rating = user.rating + data.add;

        await updateUserRatingModel(comment.user_id, rating);
    },
};

export const updateCommentService = async (id: number, user: User, bodyData: Comment): Promise<void> => {
    const { error } = createCommentSchema.validate(bodyData);
    if (error) throw new CustomError(error.message, 400);

    const comment = await findOneCommentModel(id);
    if (!comment) throw new CustomError('No found comment', 204);
    if (comment.user_id !== user.id) throw new CustomError('access denied', 401);

    await updateCommentModel(id, bodyData);
};

export const deleteCommentService = async (id: number, user: User): Promise<void> => {
    const comment = await findOneCommentModel(id);
    if (!comment) throw new CustomError('No found comment', 204);
    if (comment.user_id === user.id || user.role === 'admin') {
        await deleteCommentModel(id);
    } else {
        throw new CustomError('access denied', 401);
    }
};

export const deleteLikeUnderCommentService = {
    delete: async (id: number, user: User): Promise<Like_to_comment> => {
        const like = await findOneLikeUnderComment(id, user.id);
        if (!like) throw new CustomError('No found like', 204);

        await deleteLikeUnderComment(like.id);
        return like;
    },
    updateRating: async (id: number, like: Like_to_comment): Promise<void> => {
        const comment = await findOneCommentModel(id);
        const user = await findOneUserById(comment.user_id);

        if (like.type === 'dislike') {
            await updateUserRatingModel(user.id, user.rating + 1);
        } else {
            await updateUserRatingModel(user.id, user.rating - 1);
        }
    },
};
