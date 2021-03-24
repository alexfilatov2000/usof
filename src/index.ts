import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import router from "./routes/main";
import { postgresDB } from './db/pgDb';

const app = new Koa();
const PORT = process.env.PORT || 3000;

postgresDB().catch((err) => console.log(err));
app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
