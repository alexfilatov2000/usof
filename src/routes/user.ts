import Router from 'koa-router';
import UserController from '../controllers/auth';
const userRouter = new Router();

userRouter.get('/api/users', UserController.register);
userRouter.post('/api/users/:_id', UserController.login);
userRouter.post('/api/users', UserController.passwordReset);
userRouter.post('/api/users/avatar', UserController.receiveNewPassword);
userRouter.patch('/api/users/:_id', UserController.receiveNewPassword);
userRouter.delete('/api/users/:_id', UserController.receiveNewPassword);

export default userRouter.routes();