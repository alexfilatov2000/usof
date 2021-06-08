import { define } from 'typeorm-seeding';
import { Comment } from '../entity/comment';
import Faker from 'faker';
import { findAllPosts } from '../models/postModels';
import { findAllUsers } from '../models/userModels';

//@ts-ignore
define(Comment, async (faker: typeof Faker) => {
    // @ts-ignore
    // const posts = await findAllPosts();
    // const users = await findAllUsers();
    // const randomContent = faker.lorem.paragraphs();
    // const randomUserId = faker.random.arrayElement(users.map((user) => user.id));
    // const randomPostId = faker.random.arrayElement(posts.map((post) => post.id));
    //
    // const comment = new Comment();
    // comment.content = randomContent;
    // comment.post_id = randomPostId;
    // comment.user_id = randomUserId;
    //
    // return comment;
});
