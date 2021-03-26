import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import router from './routes/main';
import { postgresDB } from './db/pgDb';
import formidable from 'formidable'
import fs from 'fs';
import path from 'path';

const app = new Koa();
const PORT = process.env.PORT || 5000;

postgresDB().catch((err) => console.log(err));
app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
