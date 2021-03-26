import authRouter from './auth';
import user from "./user";
import Router from 'koa-router';

const router = new Router();
const allRouters: any = new Router();

allRouters.use(authRouter);
allRouters.use(user);

router.use(allRouters.routes());
export default router;
