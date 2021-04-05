import { define } from 'typeorm-seeding';
import { User } from '../entity/user';
import Faker from 'faker';
import argon2 from 'argon2';

//@ts-ignore
define(User, async (faker: typeof Faker) => {
    const randomName = faker.name.findName();
    const randomLogin = faker.random.word();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    const randomRole: 'user' | 'admin' = faker.random.arrayElement(['user', 'admin']);
    const randomIsVerified = faker.random.arrayElement([true, false]);

    const user = new User();
    user.full_name = randomName;
    user.login = randomLogin;
    user.email = randomEmail;
    user.password = await argon2.hash(randomPassword);
    user.role = randomRole;
    user.isVerified = randomIsVerified;
    return user;
});
