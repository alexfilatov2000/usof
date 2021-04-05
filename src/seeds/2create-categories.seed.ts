import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Category } from '../entity/category';

export default class CreateCategoriesSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values([
                { title: 'html', description: 'about html about html' },
                { title: 'css', description: 'about css about css' },
                { title: 'js', description: 'about js about js' },
                { title: 'nodeJs', description: 'about nodeJs about nodeJs' },
                { title: 'react', description: 'about react about react' },
            ])
            .execute();
    }
}
