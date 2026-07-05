import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import {
    createFoodBodySchema,
    updateFoodBodySchema,
    foodResponseSchema,
} from "../dtos/foodDto.js";
import { registerFoodPaths } from "./paths/foodPaths.js";

const registry = new OpenAPIRegistry();

registry.register("Food", foodResponseSchema);
registry.register("CreateFoodRequest", createFoodBodySchema);
registry.register("UpdateFoodRequest", updateFoodBodySchema);

registerFoodPaths(registry);

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
