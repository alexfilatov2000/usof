// you should rename file!!!
// file name must be:
// config.ts

export const config = {
    db: {
        user: 'YOUR_USERNAME', //you should rename this field
        host: 'localhost',
        database: 'usof',
        port: 5432,
    },
    token: {
        accessToken: 'ACCESS_TOKEN_SECRET',
        resetToken: 'RESET_TOKEN_SECRET',
        verifyEmailToken: 'VERIFY_TOKEN_SECRET',
    },
    mail: {
        email: 'YOUR_EMAIL', //you should rename this field
        password: 'YOUR_PASSWORD', //you should rename this field
    },
};
