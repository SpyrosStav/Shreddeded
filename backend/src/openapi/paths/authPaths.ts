import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { loginRequestSchema } from "../../dtos/auth/login.validation.js";

export const registerAuthPaths = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: "/auth/login",
        "x-order": 1,
        tags: ["Authorization"],
        summary: "Login user",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: loginRequestSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Login successful",
                content: {
                    "application/json": {
                        schema: loginRequestSchema,
                    },
                },
            },
            401: {
                description: "Invalid credentials",
            },
        },
    });
};