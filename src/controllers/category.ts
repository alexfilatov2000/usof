import { Context } from 'koa';
import {
    getAllCategoryService,
    createCategoryService,
    getOneCategoryService,
    getAllPostsService,
    updateCategoryService,
    deleteCategoryService
} from '../services/categoryService';

export default class CategoryController {
    /* ===|===|===|===|===| get '/api/categories' |===|===|===|===|===|===|===| */

    public static async getAllCategories(ctx: Context): Promise<void> {
        try {
            //find all categories
            ctx.body = await getAllCategoryService();
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/categories/:id' |===|===|===|===|===|===|===| */

    public static async getOneCategory(ctx: Context): Promise<void> {
        try {
            //find one category by id
            ctx.body = await getOneCategoryService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| get '/api/categories:id/posts' |===|===|===|===|===|===|===| */

    public static async getAllPostsByCategoryId(ctx: Context): Promise<void> {
        try {
            //find all posts by category_id
            ctx.body = await getAllPostsService(ctx.params.id);
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| post '/api/categories' |===|===|===|===|===|===|===| */

    public static async createCategory(ctx: Context): Promise<void> {
        try {
            //create new category (title, description?)
            await createCategoryService(ctx.request.body);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| patch '/api/categories/:id' |===|===|===|===|===|===|===| */

    public static async updateCategory(ctx: Context): Promise<void> {
        try {
            //update category by id (title?, description?)
            await updateCategoryService(ctx.request.body, ctx.params.id);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }

    /* ===|===|===|===|===| delete '/api/categories/:id' |===|===|===|===|===|===|===| */

    public static async deleteCategory(ctx: Context): Promise<void> {
        try {
            //delete category by id
            await deleteCategoryService(ctx.params.id);
            ctx.status = 200;
        } catch (err) {
            ctx.body = { error: err.message };
            ctx.status = err.statusCode || 500;
        }
    }
}
