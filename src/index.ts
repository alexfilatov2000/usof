import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import router from './routes/main';
import serve from 'koa-static';
import path from "path";
import { postgresDB } from './db/pgDb';

const app = new Koa();
const PORT = process.env.PORT || 80;

postgresDB().catch((err) => err.message);
app.use(serve(path.join(__dirname, '../public')));
app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});