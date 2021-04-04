import Router from 'koa-router';
import auth from './auth';
import user from './user';
import post from './post';
import category from './category';
import comment from './comment';

const router = new Router();
const allRouters: any = new Router();

allRouters.use(auth);
allRouters.use(user);
allRouters.use(post);
allRouters.use(category);
allRouters.use(comment);

router.use(allRouters.routes());
export default router;
