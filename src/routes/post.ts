import Router from 'koa-router';
import PostController from '../controllers/post';
import { auth } from '../middleware/userAuth';
const postRouter = new Router();

//id = post_id
postRouter.get('/api/posts', PostController.getAllPosts);
postRouter.get('/api/posts/:id', PostController.getSpecifiedPosts);
postRouter.get('/api/posts/:id/comments', PostController.getAllComments);
postRouter.get('/api/posts/:id/categories', PostController.getAllCategories);
postRouter.get('/api/posts/:id/like', PostController.getAllLikes);

postRouter.post('/api/posts', auth, PostController.createPost);
postRouter.post('/api/posts/:id/comments', auth, PostController.createComment);
postRouter.post('/api/posts/:id/like', auth, PostController.createLike);

postRouter.patch('/api/posts/:id', auth, PostController.updatePost);
postRouter.delete('/api/posts/:id', auth, PostController.deletePost);

export default postRouter.routes();
