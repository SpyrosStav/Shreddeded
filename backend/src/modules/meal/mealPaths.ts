import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { mealCreateSchema, mealParamsSchema, mealQuerySchema, mealSchema, mealUpdateSchema } from "../../modules/meal/meal.validation.js";

export const registerMealPaths = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "get",
        path: "/meals/{id}",
        "x-order": 1,
        tags: ["Meals"],
        summary: "Find meal by id",
        request: {
            params: mealParamsSchema,
        },
        responses: {
            200: {
                description: "Meal found",
                content: {
                    "application/json": {
                        schema: mealSchema,
                    },
                },
            },
            404: {
                description: "Meal not found",
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/meals",
        "x-order": 2,
        tags: ["Meals"],
        summary: "Find meals by criteria",
        request: {
            query: mealQuerySchema,
        },
        responses: {
            200: {
                description: "List of meals",
                content: {
                    "application/json": {
                        schema: mealSchema.array(),
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "post",
        path: "/meals",
        "x-order": 3,
        tags: ["Meals"],
        summary: "Create meal",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: mealCreateSchema,
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Created",
                content: {
                    "application/json": {
                        schema: mealSchema,
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "put",
        path: "/meals/{id}",
        "x-order": 4,
        tags: ["Meals"],
        summary: "Update meal",
        request: {
            params: mealParamsSchema,
            body: {
                content: {
                    "application/json": {
                        schema: mealUpdateSchema,
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Updated",
                content: {
                    "application/json": {
                        schema: mealSchema,
                    },
                },
            },
            404: {
                description: "Meal not found",
            },
        },
    });

    registry.registerPath({
        method: "delete",
        path: "/meals/{id}",
        "x-order": 5,
        tags: ["Meals"],
        summary: "Delete meal",
        request: {
            params: mealParamsSchema,
        },
        responses: {
            204: {
                description: "Deleted",
            },
            404: {
                description: "Meal not found",
            },
        },
    });
};