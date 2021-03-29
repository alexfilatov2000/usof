import { Context } from 'koa';
import { getManager, Repository } from 'typeorm';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';
import { Category } from "../entity/category";
import { createPostVal, createCommentVal, createLikeVal } from "../lib/validation/postValidation";
import { Like } from "../entity/like";

/* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

export default class PostController {
    public static async getAllPosts(ctx: Context): Promise<void | number> {
        const postRepository: Repository<Post> = getManager().getRepository(Post);
        const allPosts = await postRepository.find();
        if (!allPosts) {
            //if no found posts (posts = [])
            return (ctx.status = 204);
        } else {
            ctx.status = 200;
            ctx.body = allPosts;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async getSpecifiedPosts(ctx: Context): Promise<void | number> {
        const postRepository: Repository<Post> = getManager().getRepository(Post);
        const { id } = ctx.params;
        if (/\D/g.test(id)) return (ctx.status = 400);

        const onePost = await postRepository.findOne(id);
        if (!onePost) {
            //if no found post (post = [])
            return (ctx.status = 204);
        } else {
            ctx.status = 200;
            ctx.body = onePost;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async getAllComments(ctx: Context): Promise<void | number> {
        const commentRepository: Repository<Comment> = getManager().getRepository(Comment);
        const { id } = ctx.params;
        if (/\D/g.test(id)) return (ctx.status = 400);

        const comments = await commentRepository.find({ where: { post_id: id }});
        if (!comments.length) {
            //if no found comments (comments = [])
            return (ctx.status = 204);
        } else {
            ctx.status = 200;
            ctx.body = comments;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async getAllCategories(ctx: Context): Promise<void | number> {
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);
        const { id } = ctx.params;
        if (/\D/g.test(id)) return (ctx.status = 400);

        const categories = await categoryRepository.find({ where: { post_id: id }});
        if (!categories.length) {
            //if no found categories (categories = [])
            return (ctx.status = 204);
        } else {
            ctx.status = 200;
            ctx.body = categories;
        }
    }

    public static async getAllLikes(ctx: Context): Promise<void | number> {
        const likeRepository: Repository<Like> = getManager().getRepository(Like);
        const { id } = ctx.params;
        if (/\D/g.test(id)) return (ctx.status = 400);

        const likes = await likeRepository.find({ where: { post_id: id }});
        if (!likes.length) {
            //if no found likes (likes = [])
            return (ctx.status = 204);
        } else {
            ctx.status = 200;
            ctx.body = likes;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async createPost(ctx: Context): Promise<void | number> {
        const postRepository: Repository<Post> = getManager().getRepository(Post);
        const { userByToken, title, content, categories } = ctx.request.body;
        const validation = createPostVal(ctx.request.body);

        if (validation.status === 200){
            const postToBeSaved: Post = new Post();
            postToBeSaved.author = userByToken.login;
            postToBeSaved.title = title;
            postToBeSaved.content = content;
            postToBeSaved.categories = categories;
            postToBeSaved.user_id = userByToken.id;

            // Create a new post
            try {
                await postRepository.save(postToBeSaved);
                ctx.status = 200;
            } catch (e) {
                ctx.throw(400, e.message);
            }
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async createComment(ctx: Context): Promise<void | number> {
        const commentRepository: Repository<Comment> = getManager().getRepository(Comment);
        const { userByToken, content } = ctx.request.body;
        const { id } = ctx.params;
        if (/\D/g.test(id)) return (ctx.status = 400);

        const validation = createCommentVal(ctx.request.body);
        if (validation.status === 200){
            const commentToBeSaved: Comment = new Comment();
            commentToBeSaved.author = userByToken.login;
            commentToBeSaved.content = content;
            commentToBeSaved.post_id = id;
            // Create a new post
            try {
                await commentRepository.save(commentToBeSaved);
                ctx.status = 200;
            } catch (e) {
                ctx.throw(400, e.message);
            }
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }

    /* ===|===|===|===|===|===|===|===|===|===|===|===|===|===|===|===| */

    public static async createLike(ctx: Context): Promise<void | number> {
        const likeRepository: Repository<Like> = getManager().getRepository(Like);
        const { userByToken, type } = ctx.request.body;
        const { id } = ctx.params;
        if (/\D/g.test(id)) return (ctx.status = 400);

        const validation = createLikeVal(ctx.request.body);
        if (validation.status === 200){
            const likeToBeSaved: Like = new Like();
            likeToBeSaved.author = userByToken.login;
            likeToBeSaved.type = type;
            likeToBeSaved.post_id = userByToken.id;
            try {
                await likeRepository.save(likeToBeSaved);
                ctx.status = 200;
            } catch (e) {
                ctx.throw(400, e.message);
            }
        } else {
            ctx.status = validation.status;
            ctx.body = validation.body;
        }
    }
}
