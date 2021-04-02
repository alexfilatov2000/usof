import Router from 'koa-router';
import CategoryController from '../controllers/category';

const CategoryRouter = new Router();

CategoryRouter.get('/api/categories', CategoryController.getAllCategories);
CategoryRouter.get('/api/categories/:id', CategoryController.getOneCategory);
CategoryRouter.get('/api/categories/:id/posts', CategoryController.getAllPostsByCategoryId);

CategoryRouter.post('/api/categories', CategoryController.createCategory);
CategoryRouter.patch('/api/categories/:id', CategoryController.updateCategory);
CategoryRouter.delete('/api/categories/:id', CategoryController.deleteCategory);

export default CategoryRouter.routes();
