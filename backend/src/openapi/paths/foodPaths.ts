import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { foodParamsSchema, foodQuerySchema, foodCreateSchema, foodUpdateSchema, foodSchema } from "../../dtos/food/food.validation.js";

export const registerFoodPaths = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "get",
        path: "/foods/{id}",
        "x-order": 1,
        tags: ["Foods"],
        summary: "Find food by id",
        request: {
            params: foodParamsSchema,
        },
        responses: {
            200: {
                description: "Food found",
                content: {
                    "application/json": {
                        schema: foodSchema,
                    },
                },
            },
            404: {
                description: "Food not found",
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/foods",
        "x-order": 2,
        tags: ["Foods"],
        summary: "Find foods by criteria",
        request: {
            query: foodQuerySchema,
        },
        responses: {
            200: {
                description: "List of foods",
                content: {
                    "application/json": {
                        schema: foodSchema.array(),
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "post",
        path: "/foods",
        "x-order": 3,
        tags: ["Foods"],
        summary: "Create food",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: foodCreateSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Created",
                content: {
                    "application/json": {
                        schema: foodSchema,
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "put",
        path: "/foods/{id}",
        "x-order": 4,
        tags: ["Foods"],
        summary: "Update food",
        request: {
            params: foodParamsSchema,
            body: {
                content: {
                    "application/json": {
                        schema: foodUpdateSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Updated",
                content: {
                    "application/json": {
                        schema: foodSchema,
                    },
                },
            },
            404: {
                description: "Food not found",
            },
        },
    });

    registry.registerPath({
        method: "delete",
        path: "/foods/{id}",
        "x-order": 5,
        tags: ["Foods"],
        summary: "Delete food",
        request: {
            params: foodParamsSchema,
        },
        responses: {
            204: {
                description: "Deleted",
            },
            404: {
                description: "Food not found",
            },
        },
    });
};