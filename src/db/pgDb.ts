import { createConnection } from 'typeorm';

export const postgresDB = async (): Promise<void> => {
    return await createConnection()
        .then(() => {
            console.log('Database connection established');
        })
        .catch((err) => console.log(err.message));
};
