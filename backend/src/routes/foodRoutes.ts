import express from "express";
import { validate } from "../middleware/validateRequest.js";
import { foodIdParamsSchema, createFoodBodySchema, updateFoodBodySchema, foodQuerySchema } from "../dtos/food/food.validation.js";
import { findById, findByCriteria, add, update, remove } from "../controllers/foodController.js";

const router = express.Router();

// Find by Id
router.get("/:id", validate({ params: foodIdParamsSchema }), findById);

// Find by criteria
router.get("/", validate({ query: foodQuerySchema }), findByCriteria);

// Create
router.post("/", validate({ body: createFoodBodySchema }), add);

// Update
router.put("/:id", validate({ params: foodIdParamsSchema, body: updateFoodBodySchema }), update);

// Remove
router.delete("/:id", validate({ params: foodIdParamsSchema }), remove);

export default router;