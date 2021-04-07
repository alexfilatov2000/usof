import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Like_to_comment } from '../entity/like_to_comment';

export default class CreateLikeSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Like_to_comment)().createMany(1);
    }
}
