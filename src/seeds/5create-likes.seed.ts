import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Like } from '../entity/like';

export default class CreateLikeSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Like)().createMany(1);
    }
}
