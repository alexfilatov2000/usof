import {getManager, Repository} from "typeorm";
import {User} from "../entity/user";
import argon2 from "argon2";

export const findUserByLogin = async (login) => {
    const user: Repository<User> = getManager().getRepository(User);
    return await user.findOne({ login });
}

export const findUserByEmail = async (email) => {
    const user: Repository<User> = getManager().getRepository(User);
    return await user.findOne({ email });
}

export const saveNewUser = async (full_name, login, email, password) => {
    const user: Repository<User> = getManager().getRepository(User);

    const userToBeSaved: User = new User();
    userToBeSaved.full_name = full_name;
    userToBeSaved.login = login;
    userToBeSaved.email = email;
    userToBeSaved.password = password;
    return await user.save(userToBeSaved);
}

export const setHashPassword = async (password) => {
    return await argon2.hash(password);
};

export const verifyPassword = async (hash, password) => {
    return await argon2.verify(hash, password);
};
