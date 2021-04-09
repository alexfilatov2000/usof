import { define } from 'typeorm-seeding';
import { Like_to_comment } from '../entity/like_to_comment';
import Faker from 'faker';
import { findAllPosts } from '../models/postModels';
import { findAllUsers } from '../models/userModels';

//@ts-ignore
define(Like_to_comment, async (faker: typeof Faker) => {
    const posts = await findAllPosts();
    const users = await findAllUsers();
    const randomUserId = faker.random.arrayElement(users.map((user) => user.id));
    const randomPostId = faker.random.arrayElement(posts.map((post) => post.id));
    const randomType: 'like' | 'dislike' = faker.random.arrayElement(['like', 'dislike']);

    const like = new Like_to_comment();
    like.type = randomType;
    like.user_id = randomUserId;

    return like;
});
