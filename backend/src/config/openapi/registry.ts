import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registerAuthPaths } from "../../modules/auth/authPaths.js";
import { loginRequestSchema } from "../../modules/auth/login.validation.js";
import { foodCreateSchema, foodSchema, foodUpdateSchema } from "../../modules/food/food.validation.js";
import { registerFoodPaths } from "../../modules/food/foodPaths.js";
import { createUserRequestSchema } from "../../modules/user/user.validation.js";
import { registerUserPaths } from "../../modules/user/userPaths.js";

const registry = new OpenAPIRegistry();

// Authentication
registry.register("Login", loginRequestSchema);
registerAuthPaths(registry);

// Users
registry.register("Register", createUserRequestSchema);
registerUserPaths(registry);

// Foods
registry.register("Food", foodSchema);
registry.register("CreateFoodRequest", foodCreateSchema);
registry.register("UpdateFoodRequest", foodUpdateSchema);
registerFoodPaths(registry);

// API Document Generation
export const generateOpenApiDocument = () => {
    const generator = new OpenApiGeneratorV3(registry.definitions);

    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "Shreddeded Swagger",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    });
};
