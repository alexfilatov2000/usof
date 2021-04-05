import { define } from 'typeorm-seeding';
import { Post } from '../entity/post';
import Faker from 'faker';
import { findAllUsers } from '../models/userModels';

//@ts-ignore
define(Post, async (faker: typeof Faker) => {
    const users = await findAllUsers();
    const randomTitle = faker.lorem.word();
    const randomContent = faker.lorem.paragraphs();
    const randomStatus: 'active' | 'inactive' = faker.random.arrayElement(['active', 'inactive']);
    const randomUserId = faker.random.arrayElement(users.map((user) => user.id));

    const post = new Post();
    post.title = randomTitle;
    post.content = randomContent;
    post.status = randomStatus;
    post.user_id = randomUserId;

    return post;
});
