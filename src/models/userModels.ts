import { getManager, Repository } from 'typeorm';
import { User } from '../entity/user';

export const findAllUsers = async (): Promise<User[]> => {
    const user: Repository<User> = getManager().getRepository(User);
    return await user.find();
};

export const findOneUserById = async (id: number): Promise<User> => {
    const user: Repository<User> = getManager().getRepository(User);
    return await user.findOne(id);
};

export const deleteUserById = async (id: number): Promise<void> => {
    const user: Repository<User> = getManager().getRepository(User);
    await user.delete(id);
};

export const createUser = async (data: User): Promise<User> => {
    const user: Repository<User> = getManager().getRepository(User);

    const userToBeSaved: User = new User();
    userToBeSaved.full_name = data.full_name;
    userToBeSaved.login = data.login;
    userToBeSaved.email = data.email;
    userToBeSaved.password = data.password;
    userToBeSaved.role = data.role;
    userToBeSaved.isVerified = true;
    return await user.save(userToBeSaved);
};

export const updateUser = async (id: number, data: User): Promise<void> => {
    const user: Repository<User> = getManager().getRepository(User);

    await user.update(id, {
        full_name: data.full_name,
        login: data.login,
        email: data.email,
        password: data.password,
    });
};

export const addImageModel = async (fileName: string, user: User): Promise<void> => {
    const userRepository: Repository<User> = getManager().getRepository(User);
    user.profile_picture = fileName;
    await userRepository.save(user);
};
