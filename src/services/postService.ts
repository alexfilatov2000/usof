import {
    findAllPosts,
    findOnePost,
    findComments,
    findCategories,
    findLikes,
    createPostModel,
    createCommentModel,
    createLikeModel,
    updatePostModel,
    deletePostModel,
    deleteLikeUnderPost,
    findOneLikeUnderPost,
    findByIdsModel,
} from '../models/postModels';
import { CustomError } from '../lib/hadleErrors/handleErrror';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';
import { Category } from '../entity/category';
import { Like } from '../entity/like';
import { createCommentSchema, createLikeSchema, createPostSchema, updatePostSchema } from '../lib/joi/joiShemaPost';
import { User } from '../entity/user';
import { findOneUserById } from '../models/userModels';
import { updateUserRatingModel } from '../models/commentModels';

export const getAllPostsService = async (): Promise<Post[]> => {
    const posts = await findAllPosts();
    if (!posts) throw new Error('No user found');
    return posts;
};

export const getOnePostService = async (id: number): Promise<Post> => {
    const post = await findOnePost(id);
    if (!post) throw new CustomError('No user found', 204);
    return post;
};

export const getCommentsService = async (id: number): Promise<Comment[]> => {
    const comments = await findComments(id);
    // if no found comments (comments = [])
    if (!comments.length) throw new CustomError('No comments found', 204);
    return comments;
};

export const getCategoriesService = async (id: number): Promise<Category[]> => {
    const categories = await findCategories(id);
    // if no found categories (categories = [])
    if (!categories.length) throw new CustomError('No category found', 204);
    return categories;
};

export const getLikesService = async (id: number): Promise<Like[]> => {
    const likes = await findLikes(id);
    // if no found likes (likes = [])
    if (!likes.length) throw new CustomError('No likes found', 204);
    return likes;
};

export const createPostService = async (bodyData: Post, user: User): Promise<void> => {
    const { error } = createPostSchema.validate(bodyData);
    if (error) throw new CustomError(error.message, 400);
    //@ts-ignore
    const commentsArr = await findByIdsModel(bodyData.categories);
    await createPostModel(bodyData, user, commentsArr);
};

export const createCommentService = async (bodyData: Comment, post_id: number, user: User): Promise<void> => {
    const { error } = createCommentSchema.validate(bodyData);
    if (error) throw new CustomError(error.message, 400);

    await createCommentModel(bodyData, post_id, user);
};

export const createLikeService = {
    create: async (bodyData: Like, post_id: number, user: User): Promise<void> => {
        const { error } = createLikeSchema.validate(bodyData);
        if (error) throw new CustomError(error.message, 400);

        await createLikeModel(bodyData, post_id, user);
    },
    updateRating: async (bodyData: Like, post_id: number): Promise<void> => {
        const post = await findOnePost(post_id);
        const user = await findOneUserById(post.user_id);
        if (bodyData.type === 'dislike') {
            await updateUserRatingModel(user.id, user.rating - 1);
        } else {
            await updateUserRatingModel(user.id, user.rating + 1);
        }
    },
};

export const updatePostService = async (bodyData: Post, post_id: number, user: User): Promise<void> => {
    const { error } = updatePostSchema.validate(bodyData);
    const post = await findOnePost(post_id);

    if (!post) throw new CustomError('No post found', 204);
    if (post.user_id !== user.id) throw new CustomError('Access denied', 400);
    if (error) throw new CustomError(error.message, 400);

    if (!bodyData.title) bodyData.title = post.title;
    if (!bodyData.content) bodyData.content = post.content;

    if (!bodyData.categories) {
        const post = await findOnePost(post_id);
        //@ts-ignore
        bodyData.categories = post.categories.map((item) => item.id);
    } else {
        //@ts-ignore
        const categories = await findByIdsModel(bodyData.categories);
        if (!categories.length) throw new Error("one of categories doesn't exist");
    }
    await updatePostModel(bodyData, post_id);
};

export const deletePostService = async (user: User, id: number): Promise<void> => {
    const post = await findOnePost(id);
    if (!post) throw new CustomError('No post found', 204);
    if (post.user_id !== user.id) throw new CustomError('access denied', 400);

    await deletePostModel(id);
};

export const deleteLikeService = {
    delete: async (user: User, post_id: number): Promise<Like> => {
        const like = await findOneLikeUnderPost(post_id, user.id);
        if (!like) throw new CustomError('No post found', 204);

        await deleteLikeUnderPost(like.id);
        return like;
    },
    updateRating: async (post_id: number, like: Like): Promise<void> => {
        const post = await findOnePost(post_id);
        const user = await findOneUserById(post.user_id);

        if (like.type === 'dislike') {
            await updateUserRatingModel(user.id, user.rating + 1);
        } else {
            await updateUserRatingModel(user.id, user.rating - 1);
        }
    },
};
