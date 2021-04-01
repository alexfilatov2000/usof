import { findAllUsers, findOneUserById, createUser, updateUser, deleteUserById } from '../models/userModels';
import { createUserSchema, updateUserSchema } from '../lib/joi/joiShemaAuth';
import { findUserByEmail, findUserByLogin, setHashPassword } from '../models/authModels';
import { User } from '../entity/user';

export const getAllUsersService = async () => {
    const allUsers = await findAllUsers();
    if (!allUsers) {
        throw new Error('No user found');
    } else {
        return allUsers;
    }
};

export const getOneUserService = async (id) => {
    const user = await findOneUserById(id);
    if (!user) {
        throw new Error('No user found');
    } else {
        return user;
    }
};

export const createUserService = async (bodyData: User) => {
    const { error } = createUserSchema.validate(bodyData);

    if (error) throw new Error(error.message);
    if (await findUserByEmail(bodyData.email)) throw new Error('Email is already exist');
    if (await findUserByLogin(bodyData.login)) throw new Error('Login is already exist');

    bodyData.password = await setHashPassword(bodyData.password);
    return createUser(bodyData);
};

export const updateUserService = async (bodyData: User, id: number) => {
    const { error } = updateUserSchema.validate(bodyData);
    if (error) throw new Error(error.message);

    if (await findUserByEmail(bodyData.email)) throw new Error('Email is already exist');
    if (await findUserByLogin(bodyData.login)) throw new Error('Login is already exist');

    bodyData.password = await setHashPassword(bodyData.password);

    await updateUser(id, bodyData);
    return bodyData;
};

export const deleteUser = async (id) => {
    const user = await findOneUserById(id);
    if (!user) {
        throw new Error('No user found with this id');
    } else {
        await deleteUserById(id);
    }
};
