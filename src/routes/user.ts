import Router from 'koa-router';
import UserController from '../controllers/user';
const userRouter = new Router();
import { upload } from "../lib/multerOptions";
import {authToken} from "../middleware/tokenAuth";

userRouter.get('/api/users', UserController.getAllUsers);
userRouter.get('/api/users/:id', UserController.getUserById);
userRouter.post('/api/users', UserController.createUser);
userRouter.post('/api/users/avatar', upload.single('upload'), UserController.setAvatar);
userRouter.patch('/api/users/:id', authToken, UserController.updateUserData);
// userRouter.delete('/api/users/:id', UserController.receiveNewPassword);

export default userRouter.routes();
