import { sendErr } from '../interfaces/userInterface';
import { createUserSchema, updateUserSchema } from '../joi/joiShemaAuth';
import { User } from '../../entity/user';

export const createUserVal = (bodyData: User, findByEmailObj: User, findByLoginObj: User): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = createUserSchema.validate(bodyData);

    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else if (findByEmailObj) {
        newErr.status = 400;
        newErr.body = { error: 'Email is already exist' };
        return newErr;
    } else if (findByLoginObj) {
        newErr.status = 400;
        newErr.body = { error: 'Login is already exist' };
        return newErr;
    } else {
        return newErr;
    }
};

export const updateUserVal = (bodyData: User, findByEmailObj: User, findByLoginObj: User): sendErr => {
    const newErr = { status: 200, body: {} };
    const { error } = updateUserSchema.validate(bodyData);

    if (error) {
        newErr.status = 400;
        newErr.body = { error: error.message };
        return newErr;
    } else if (findByEmailObj) {
        newErr.status = 400;
        newErr.body = { error: 'Email is already exist' };
        return newErr;
    } else if (findByLoginObj) {
        newErr.status = 400;
        newErr.body = { error: 'Login is already exist' };
        return newErr;
    } else {
        return newErr;
    }
};
