import authRouter from "./auth";
// import url from './urlRouter';
import Router from "koa-router";

const router = new Router();
const allRouters: any = new Router();

allRouters.use(authRouter);
// api.use(url);


router.use(allRouters.routes());
export default router;