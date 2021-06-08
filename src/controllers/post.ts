import { Context } from 'koa';
import * as service from '../services/postService';

export default class PostController {
    /* ===|===|===|===|===| get '/api/posts' |===|===|===|===|===|===|===| */

    public static async getAllPosts(ctx: Context): Promise<void> {
        try {
            //find all posts
            ctx.body = await service.getAllPostsService(ctx.query);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = 400;
        }
    }

    /* ===|===|===|===|===| get '/api/posts/:id' |===|===|===|===|===|===|===| */

    public static async getSpecifiedPost(ctx: Context): Promise<void> {
        try {
            //find one post by id
            ctx.body = await service.getOnePostService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/posts/:id/comments' |===|===|===|===|===|===| */

    public static async getAllComments(ctx: Context): Promise<void> {
        try {
            //find all comments by post_id
            ctx.body = await service.getCommentsService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/posts/:id/categories' |===|===|===|===|===|===| */

    public static async getAllCategories(ctx: Context): Promise<void> {
        try {
            //find all categories by post_id
            ctx.body = await service.getCategoriesService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/posts/:id/like' |===|===|===|===|===|===| */

    public static async getAllLikes(ctx: Context): Promise<void> {
        try {
            //find all likes by post_id
            ctx.body = await service.getLikesService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| post '/api/posts' |===|===|===|===|===|===|===| */

    public static async createPost(ctx: Context): Promise<void> {
        try {
            //create new post
            await service.createPostService(ctx.request.body, ctx.userByToken);
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
            ctx.body = await service.createCommentService(ctx.request.body, ctx.params.id, ctx.userByToken);
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
            const data = await service.createLikeService.create(ctx.request.body, ctx.params.id, ctx.userByToken);
            //update user rating
            await service.createLikeService.updateRating(ctx.request.body, ctx.params.id, data);
            ctx.status = data.status;
            ctx.body = data.val;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| patch '/api/posts/:id' |===|===|===|===|===|===|===| */

    public static async updatePost(ctx: Context): Promise<void> {
        try {
            //update post (title?, content?, categories?) if exist
            await service.updatePostService(ctx.request.body, ctx.params.id, ctx.userByToken);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| delete '/api/posts/:id' |===|===|===|===|===|===|===| */

    public static async deletePost(ctx: Context): Promise<void> {
        try {
            //delete post
            await service.deletePostService(ctx.userByToken, ctx.params.id);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| delete '/api/posts/:id/like' |===|===|===|===|===|===|===| */

    public static async deleteLike(ctx: Context): Promise<void> {
        try {
            //delete like
            const deletedLike = await service.deleteLikeService.delete(ctx.userByToken, ctx.params.id);
            //update user rating
            await service.deleteLikeService.updateRating(ctx.params.id, deletedLike);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }
}
