import { AppError } from "./AppError.js";

export class InvalidCredentialsError extends AppError {

    constructor() {
        super(401, "Invalid credentials");
    }

}