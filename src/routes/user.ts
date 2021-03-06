import Router from 'koa-router';
import UserController from '../controllers/user';
const userRouter = new Router();
import { upload } from '../middleware/multerOptions';
import { auth } from '../middleware/userAuth';
import { adminAuth } from '../middleware/adminAuth';

userRouter.get('/api/users', UserController.getAllUsers);
userRouter.get('/api/users/:id', UserController.getUserById);
userRouter.post('/api/users', adminAuth, UserController.createUser);
userRouter.post('/api/users/avatar', upload.single('upload'), auth, UserController.setAvatar);
userRouter.patch('/api/users/full_name/:id', auth, UserController.updateFullName);
userRouter.patch('/api/users/login/:id', auth, UserController.updateLogin);
userRouter.patch('/api/users/password/:id', auth, UserController.updatePassword);
userRouter.delete('/api/users/:id', adminAuth, UserController.deleteUser);

export default userRouter.routes();
