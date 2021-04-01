import { getManager, Repository } from 'typeorm';
import { User } from '../entity/user';
import argon2 from 'argon2';

export const findUserById = async (id: number): Promise<User> => {
    const user: Repository<User> = getManager().getRepository(User);
    return await user.findOne(id);
};

export const updateUserPswById = async (id: number, password: string): Promise<void> => {
    const user: Repository<User> = getManager().getRepository(User);
    await user.update(id, { password });
};

export const updateUserStatusById = async (id: number): Promise<void> => {
    const user: Repository<User> = getManager().getRepository(User);
    await user.update(id, { isVerified: true });
};

export const findUserByLogin = async (login: string): Promise<User> => {
    const user: Repository<User> = getManager().getRepository(User);
    return await user.findOne({ login });
};

export const findUserByEmail = async (email: string): Promise<User> => {
    const user: Repository<User> = getManager().getRepository(User);
    return await user.findOne({ email });
};

export const saveNewUser = async (full_name: string, login: string, email: string, password: string): Promise<User> => {
    const user: Repository<User> = getManager().getRepository(User);

    const userToBeSaved: User = new User();
    userToBeSaved.full_name = full_name;
    userToBeSaved.login = login;
    userToBeSaved.email = email;
    userToBeSaved.password = password;
    return await user.save(userToBeSaved);
};

export const setHashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
    return await argon2.verify(hash, password);
};
