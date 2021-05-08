import {parseJwt} from "./parseToken";

export const getRole = (token) => {
    const user = parseJwt(token);
    if (!user) {
        return null;
    } else if (user.user.role === 'user') {
        return 'user';
    } else if (user.user.role === 'admin') {
        return 'admin';
    }
}