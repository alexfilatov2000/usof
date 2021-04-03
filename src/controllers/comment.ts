import {Context} from "koa";
import {getCommentService, getLikesService, crateLikeService, updateCommentService, deleteCommentService, deleteLikeUnderCommentService} from "../services/commentService";

export default class CommentController {
    /* ===|===|===|===|===| get '/api/comments/:id' |===|===|===|===|===|===|===| */

    public static async getComment(ctx: Context): Promise<void> {
        try {
            //find all categories
            ctx.body = await getCommentService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/comments/:id/like' |===|===|===|===|===|===|===| */

    public static async getAllLikesByCommentId(ctx: Context): Promise<void> {
        try {
            //find all likes by comment_id
            ctx.body = await getLikesService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| post '/api/comments/:id/like' |===|===|===|===|===|===|===| */

    public static async createLike(ctx: Context): Promise<void> {
        try {
            //create like by comment_id
            await crateLikeService.create(ctx.params.id, ctx.userByToken, ctx.request.body);
            //update user rating
            await crateLikeService.updateRating(ctx.params.id, ctx.request.body);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| patch '/api/comments/:id' |===|===|===|===|===|===|===| */

    public static async updateComment(ctx: Context): Promise<void> {
        try {
            //update comment (content) by id, only user who create it has access for that
            await updateCommentService(ctx.params.id, ctx.userByToken, ctx.request.body);

            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| delete '/api/comments/:id' |===|===|===|===|===|===|===| */

    public static async deleteComment(ctx: Context): Promise<void> {
        try {
            //delete comment by id
            await deleteCommentService(ctx.params.id, ctx.userByToken);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| delete '/api/comments/:id/like' |===|===|===|===|===|===|===| */

    public static async deleteLikeUnderComment(ctx: Context): Promise<void> {
        try {
            //delete like by comment_id and user_id
            const deletedLike = await deleteLikeUnderCommentService.delete(ctx.params.id, ctx.userByToken);
            //update rating ( if deleteLike.type = 'like' => rating -= 1, else ... );
            await deleteLikeUnderCommentService.updateRating(ctx.params.id, deletedLike);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }
}



