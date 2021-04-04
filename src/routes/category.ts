import Router from 'koa-router';
import CategoryController from '../controllers/category';
import { adminAuth } from '../middleware/adminAuth';

const CategoryRouter = new Router();

CategoryRouter.get('/api/categories', CategoryController.getAllCategories);
CategoryRouter.get('/api/categories/:id', CategoryController.getOneCategory);
CategoryRouter.get('/api/categories/:id/posts', CategoryController.getAllPostsByCategoryId);

CategoryRouter.post('/api/categories', adminAuth, CategoryController.createCategory);
CategoryRouter.patch('/api/categories/:id', adminAuth, CategoryController.updateCategory);
CategoryRouter.delete('/api/categories/:id', adminAuth, CategoryController.deleteCategory);

export default CategoryRouter.routes();
