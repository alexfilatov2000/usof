export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const checkAndPutToken = () => {
    try {
        const token = localStorage.getItem('token')
        const x = JSON.parse(atob(token.split('.')[1]));
        if (x.exp < Date.now()/1000){
            localStorage.clear();
            return null;
        } else {
            return token;
        }
    } catch (e) {
        return null;
    }
}
