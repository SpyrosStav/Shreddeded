import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userParamsSchema, userResponseSchema, createUserRequestSchema, updateUserRequestSchema, userQuerySchema } from "../../dtos/user/user.validation.js";

export const registerUserPaths = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "get",
        path: "/users/{id}",
        "x-order": 1,
        tags: ["Users"],
        summary: "Find user by id",
        request: {
            params: userParamsSchema,
        },
        responses: {
            200: {
                description: "User found",
                content: {
                    "application/json": {
                        schema: userResponseSchema,
                    },
                },
            },
            404: {
                description: "User not found",
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/users",
        "x-order": 2,
        tags: ["Users"],
        summary: "Find user by id",
        request: {
            params: userQuerySchema,
        },
        responses: {
            200: {
                description: "User found",
                content: {
                    "application/json": {
                        schema: userResponseSchema,
                    },
                },
            }
        },
    });

    registry.registerPath({
        method: "post",
        path: "/users",
        "x-order": 3,
        tags: ["Users"],
        summary: "Create user",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: createUserRequestSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Created",
                content: {
                    "application/json": {
                        schema: userResponseSchema,
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "put",
        path: "/users/{id}",
        "x-order": 4,
        tags: ["Users"],
        summary: "Update user",
        request: {
            params: userParamsSchema,
            body: {
                content: {
                    "application/json": {
                        schema: updateUserRequestSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Updated",
                content: {
                    "application/json": {
                        schema: userResponseSchema,
                    },
                },
            },
            404: {
                description: "User not found",
            },
        },
    });

    registry.registerPath({
        method: "delete",
        path: "/users/{id}",
        "x-order": 5,
        tags: ["Users"],
        summary: "Delete user",
        request: {
            params: userParamsSchema,
        },
        responses: {
            204: {
                description: "Deleted",
            },
            404: {
                description: "User not found",
            },
        },
    });
};
