import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import router from './routes/main';
import { postgresDB } from './db/pgDb';

const app = new Koa();
const PORT = process.env.PORT || 5000;

postgresDB().catch((err) => err.message);
app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
