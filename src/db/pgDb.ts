import { createConnection } from 'typeorm';
import { postgresTables } from './pgTables';
import { config } from '../config';

export const postgresDB = async (): Promise<void> => {
    return await createConnection({
        type: 'postgres',
        host: config.db.host,
        port: config.db.port,
        username: config.db.user,
        password: null,
        database: config.db.database,
        ssl: false,
        entities: postgresTables,
        // logging: ['query', 'error'],
        synchronize: true,
    }).then(() => {
        console.log('Database connection established');
    });
};
