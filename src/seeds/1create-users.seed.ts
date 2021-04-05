import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entity/user';

export default class CreateUsersSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(User)().createMany(5);
    }
}
