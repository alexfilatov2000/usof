import Router from 'koa-router';
import auth from './auth';
import user from './user';
import post from './post';
import category from './category';

const router = new Router();
const allRouters: any = new Router();

allRouters.use(auth);
allRouters.use(user);
allRouters.use(post);
allRouters.use(category);

router.use(allRouters.routes());
export default router;
