import {parseJwt} from "./parseToken";

export const compareIds = (currentToken, otherId) => {
    const token = parseJwt(currentToken);
    if (!token) return false
    return +token.user.id === +otherId;
}