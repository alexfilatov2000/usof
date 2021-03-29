import Router from 'koa-router';
import authRouter from './auth';
import user from './user';
import post from './post';

const router = new Router();
const allRouters: any = new Router();

allRouters.use(authRouter);
allRouters.use(user);
allRouters.use(post);

router.use(allRouters.routes());
export default router;
