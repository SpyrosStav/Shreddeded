export class UnauthorizedError extends AppError {

    constructor(message = "Unauthorized") {

        super(401, message);
    }
}