import Router from 'koa-router';
import UserController from '../controllers/auth';
const authRouter = new Router();

authRouter.post('/api/auth/register', UserController.register);
authRouter.post('/api/auth/login', UserController.login);
authRouter.post('/api/auth/password-reset', UserController.passwordReset);
authRouter.post('/api/auth/password-reset/:token', UserController.receiveNewPassword);

export default authRouter.routes();
