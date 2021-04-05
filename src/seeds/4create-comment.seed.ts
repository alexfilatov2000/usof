import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Comment } from '../entity/comment';

export default class CreateCommentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Comment)().createMany(5);
    }
}
