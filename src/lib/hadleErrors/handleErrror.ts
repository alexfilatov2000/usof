export class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.message = message;
        this.statusCode = statusCode;
    }
}
