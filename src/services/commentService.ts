import { createLikeSchema, createCommentSchema } from '../lib/joi/joiShemaPost';
import { findOneUserById } from '../models/userModels';
import { CustomError } from '../lib/hadleErrors/handleErrror';
import { Comment } from '../entity/comment';
import { Like } from '../entity/like';
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

export const getLikesService = async (id: number): Promise<Like[]> => {
    const likes = await findLikesModel(id);
    if (!likes.length) throw new CustomError('No like found', 204);
    return likes;
};

export const crateLikeService = {
    create: async (id: number, user: User, bodyData: Like): Promise<void> => {
        const { error } = createLikeSchema.validate(bodyData);
        if (error) throw new CustomError(error.message, 400);

        const comment = await findOneCommentModel(id);
        if (!comment) throw new CustomError('No comment found', 204);

        await createLikeModel(id, user, bodyData);
    },
    updateRating: async (comment_id: number, bodyData: Like): Promise<void> => {
        let cnt = -1;
        if (!bodyData.type) cnt = 1;
        const comment = await findOneCommentModel(comment_id);
        const user = await findOneUserById(comment.user_id);
        const rating = user.rating + cnt;

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
    if (comment.user_id !== user.id) throw new CustomError('access denied', 401);

    await deleteCommentModel(id);
};

export const deleteLikeUnderCommentService = {
    delete: async (id: number, user: User): Promise<Like> => {
        const like = await findOneLikeUnderComment(id, user.id);
        if (!like) throw new CustomError('No found like', 204);

        await deleteLikeUnderComment(like.id);
        return like;
    },
    updateRating: async (id: number, like: Like): Promise<void> => {
        const comment = await findOneCommentModel(id);
        const user = await findOneUserById(comment.user_id);

        if (like.type === 'dislike') {
            await updateUserRatingModel(user.id, user.rating + 1);
        } else {
            await updateUserRatingModel(user.id, user.rating - 1);
        }
    },
};
