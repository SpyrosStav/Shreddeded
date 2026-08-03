import { AppError } from "./AppError.js";

export class EntityAlreadyExistsError extends AppError {

    constructor(entity: string) {
        super(409, entity + " already exists");
    }

}