import {
    findAllUsers,
    findOneUserById,
    createUser,
    updateUser,
    deleteUserById,
    addImageModel,
} from '../models/userModels';
import { createUserSchema, updateUserSchema } from '../lib/joi/joiShemaAuth';
import { findUserByEmail, findUserByLogin, setHashPassword } from '../models/authModels';
import { User } from '../entity/user';

export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers = await findAllUsers();
    if (!allUsers) {
        throw new Error('No user found');
    } else {
        return allUsers;
    }
};

export const getOneUserService = async (id: number): Promise<User> => {
    const user = await findOneUserById(id);
    if (!user) {
        throw new Error('No user found');
    } else {
        return user;
    }
};

export const createUserService = async (bodyData: User): Promise<User> => {
    const { error } = createUserSchema.validate(bodyData);

    if (error) throw new Error(error.message);
    if (await findUserByEmail(bodyData.email)) throw new Error('Email is already exist');
    if (await findUserByLogin(bodyData.login)) throw new Error('Login is already exist');

    bodyData.password = await setHashPassword(bodyData.password);
    return createUser(bodyData);
};

export const updateUserService = async (bodyData: User, id: number): Promise<User> => {
    const { error } = updateUserSchema.validate(bodyData);
    if (error) throw new Error(error.message);

    if (await findUserByEmail(bodyData.email)) throw new Error('Email is already exist');
    if (await findUserByLogin(bodyData.login)) throw new Error('Login is already exist');

    bodyData.password = await setHashPassword(bodyData.password);

    await updateUser(id, bodyData);
    return bodyData;
};

export const deleteUserService = async (id: number): Promise<void> => {
    const user = await findOneUserById(id);
    if (!user) {
        throw new Error('No user found with this id');
    } else {
        await deleteUserById(id);
    }
};

export const addImageService = async (fileName: string, user: User): Promise<void> => {
    if (!fileName) throw new Error("File name doesn't exist");
    await addImageModel(fileName, user);
};
