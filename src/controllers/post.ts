import { Context } from 'koa';
import {
    getAllPostsService,
    getOnePostService,
    getCommentsService,
    getCategoriesService,
    getLikesService,
    createPostService,
    createCommentService,
    createLikeService,
    updatePostService,
    deletePostService,
    deleteLikeService,
} from '../services/postService';

export default class PostController {
    /* ===|===|===|===|===| get '/api/posts' |===|===|===|===|===|===|===| */

    public static async getAllPosts(ctx: Context): Promise<void> {
        try {
            //find all posts
            ctx.body = await getAllPostsService();
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = 400;
        }
    }

    /* ===|===|===|===|===| get '/api/posts/:id' |===|===|===|===|===|===|===| */

    public static async getSpecifiedPost(ctx: Context): Promise<void> {
        try {
            //find one post by id
            ctx.body = await getOnePostService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/posts/:id/comments' |===|===|===|===|===|===| */

    public static async getAllComments(ctx: Context): Promise<void> {
        try {
            //find all comments by post_id
            ctx.body = await getCommentsService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/posts/:id/categories' |===|===|===|===|===|===| */

    public static async getAllCategories(ctx: Context): Promise<void> {
        try {
            //find all categories by post_id
            ctx.body = await getCategoriesService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/posts/:id/like' |===|===|===|===|===|===| */

    public static async getAllLikes(ctx: Context): Promise<void> {
        try {
            //find all likes by post_id
            ctx.body = await getLikesService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| post '/api/posts' |===|===|===|===|===|===|===| */

    public static async createPost(ctx: Context): Promise<void> {
        try {
            //create new post
            await createPostService(ctx.request.body);
            ctx.status = 201;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| post '/api/posts/:id/comments'|===|===|===|===|===|===|===| */

    public static async createComment(ctx: Context): Promise<void> {
        try {
            //create new comment
            await createCommentService(ctx.request.body, ctx.params.id);
            ctx.status = 201;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| post '/api/posts/:id/like' |===|===|===|===|===|===|===| */

    public static async createLike(ctx: Context): Promise<void> {
        try {
            //create new like
            await createLikeService(ctx.request.body, ctx.params.id);
            ctx.status = 201;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| patch '/api/posts/:id' |===|===|===|===|===|===|===| */

    public static async updatePost(ctx: Context): Promise<void> {
        try {
            //update post (title?, content?, categories?) if exist
            await updatePostService(ctx.request.body, ctx.params.id);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| delete '/api/posts/:id' |===|===|===|===|===|===|===| */

    public static async deletePost(ctx: Context): Promise<void> {
        const { userByToken } = ctx.request.body;
        const { id } = ctx.params;
        try {
            //delete post
            await deletePostService(userByToken, id);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| delete '/api/posts/:id/like' |===|===|===|===|===|===|===| */

    public static async deleteLike(ctx: Context): Promise<void> {
        const { userByToken } = ctx.request.body;
        const { id } = ctx.params;
        try {
            //delete like
            await deleteLikeService(userByToken, id);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }
}
