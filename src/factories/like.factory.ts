import { define } from 'typeorm-seeding';
import { Like } from '../entity/like';
import Faker from 'faker';
import { findAllPosts } from '../models/postModels';
import { findAllUsers } from '../models/userModels';

//@ts-ignore
define(Like, async (faker: typeof Faker) => {
    const posts = await findAllPosts();
    const users = await findAllUsers();
    const randomUserId = faker.random.arrayElement(users.map((user) => user.id));
    const randomPostId = faker.random.arrayElement(posts.map((post) => post.id));
    const randomType: 'like' | 'dislike' = faker.random.arrayElement(['like', 'dislike']);

    const like = new Like();
    like.type = randomType;
    like.post_id = randomPostId;
    like.user_id = randomUserId;

    return like;
});
