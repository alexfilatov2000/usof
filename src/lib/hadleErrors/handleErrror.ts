export class CustomError extends Error {
    public statusCode: number;

    constructor(message, statusCode) {
        super(message);

        this.message = message;
        this.statusCode = statusCode;
    }
}
