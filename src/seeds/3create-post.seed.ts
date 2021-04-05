import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Post } from '../entity/post';

export default class CreatePostSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Post)().createMany(5);
    }
}
