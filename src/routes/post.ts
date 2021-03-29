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

// userRouter.get('/api/users/:id', UserController.getUserById);
// userRouter.post('/api/users', adminAuth, UserController.createUser);
// userRouter.post('/api/users/avatar', upload.single('upload'), auth, UserController.setAvatar);
// userRouter.patch('/api/users/:id', auth, UserController.updateUserData);
// userRouter.delete('/api/users/:id', auth, UserController.deleteUser);

export default postRouter.routes();
