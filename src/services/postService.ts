import * as model from '../models/postModels';
import { CustomError } from '../lib/hadleErrors/handleErrror';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';
import { Category } from '../entity/category';
import { Like_to_post } from '../entity/like_to_post';
import { createCommentSchema, createLikeSchema, createPostSchema, updatePostSchema } from '../lib/joi/joiShemaPost';
import { User } from '../entity/user';
import { findOneUserById } from '../models/userModels';
import { updateUserRatingModel } from '../models/commentModels';

export const getAllPostsService = async (): Promise<Post[]> => {
    const posts = await model.findAllPosts();
    if (!posts) throw new Error('No user found');
    return posts;
};

export const getOnePostService = async (id: number): Promise<Post> => {
    const post = await model.findOnePost(id);
    if (!post) throw new CustomError('No user found', 204);
    return post;
};

export const getCommentsService = async (id: number): Promise<Comment[]> => {
    const comments = await model.findComments(id);
    // if no found comments (comments = [])
    if (!comments.length) throw new CustomError('No comments found', 204);
    return comments;
};

export const getCategoriesService = async (id: number): Promise<Category[]> => {
    const categories = await model.findCategories(id);
    // if no found categories (categories = [])
    if (!categories.length) throw new CustomError('No category found', 204);
    return categories;
};

export const getLikesService = async (id: number): Promise<Like_to_post[]> => {
    const likes = await model.findLikes(id);
    // if no found likes (likes = [])
    if (!likes.length) throw new CustomError('No likes found', 204);
    return likes;
};

export const createPostService = async (bodyData: Post, user: User): Promise<void> => {
    const { error } = createPostSchema.validate(bodyData);
    if (error) throw new CustomError(error.message, 400);
    //@ts-ignore
    // const commentsArr = await model.findByIdsModel(bodyData.categories);
    await model.createPostModel(bodyData, user);
};

export const createCommentService = async (bodyData: Comment, post_id: number, user: User): Promise<void> => {
    const { error } = createCommentSchema.validate(bodyData);
    if (error) throw new CustomError(error.message, 400);

    await model.createCommentModel(bodyData, post_id, user);
};

export const createLikeService = {
    create: async (bodyData: Like_to_post, post_id: number, user: User): Promise<any> => {
        const { error } = createLikeSchema.validate(bodyData);
        if (error) throw new CustomError(error.message, 400);
        //await model.createLikeModel(bodyData, post_id, user);
        const like = await model.findOneLikeUnderPost(post_id, user.id);
        if (!like) {
            await model.createLikeModel(bodyData, post_id, user);
            return {status: 201, val: 1};
        } else {
            if (like.type === bodyData.type){
                await model.deleteLikeUnderPost(like.id);
                return {status: 200, val: 1};
            } else {
                await model.deleteLikeUnderPost(like.id);
                await model.createLikeModel(bodyData, post_id, user);
                return {status: 201, val: 2};
            }
        }

    },
    updateRating: async (bodyData: Like_to_post, post_id: number): Promise<void> => {
        const post = await model.findOnePost(post_id);
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
    const post = await model.findOnePost(post_id);

    if (!post) throw new CustomError('No post found', 204);
    if (post.user_id !== user.id) throw new CustomError('Access denied', 400);
    if (error) throw new CustomError(error.message, 400);

    if (!bodyData.title) bodyData.title = post.title;
    if (!bodyData.content) bodyData.content = post.content;

    if (!bodyData.categories) {
        const post = await model.findOnePost(post_id);
        //@ts-ignore
        bodyData.categories = post.categories.map((item) => item.id);
    } else {
        //@ts-ignore
        const categories = await findByIdsModel(bodyData.categories);
        if (!categories.length) throw new Error("one of categories doesn't exist");
    }
    await model.updatePostModel(bodyData, post_id);
};

export const deletePostService = async (user: User, id: number): Promise<void> => {
    const post = await model.findOnePost(id);
    if (!post) throw new CustomError('No post found', 204);

    if (post.user_id === user.id || user.role === 'admin') await model.deletePostModel(id);
    else throw new CustomError('access denied', 400);
};

export const deleteLikeService = {
    delete: async (user: User, post_id: number): Promise<Like_to_post> => {
        const like = await model.findOneLikeUnderPost(post_id, user.id);
        if (!like) throw new CustomError('No post found', 204);

        await model.deleteLikeUnderPost(like.id);
        return like;
    },
    updateRating: async (post_id: number, like: Like_to_post): Promise<void> => {
        const post = await model.findOnePost(post_id);
        const user = await findOneUserById(post.user_id);

        if (like.type === 'dislike') {
            await updateUserRatingModel(user.id, user.rating + 1);
        } else {
            await updateUserRatingModel(user.id, user.rating - 1);
        }
    },
};
