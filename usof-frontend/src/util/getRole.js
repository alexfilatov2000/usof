import {parseJwt} from "./parseToken";

export const getRole = (token) => {
    const { user } = parseJwt(token);
    if (user.role === 'user') {
        return 'user';
    } else if (user.role === 'admin') {
        return 'admin';
    } else {
        return null;
    }
}