import express from "express";
import { validate } from "../middleware/validateRequest.js";
import { foodParamsSchema, foodQuerySchema, foodCreateSchema, foodUpdateSchema } from "../dtos/food/food.validation.js";
import { findById, findByCriteria, add, update, remove } from "../controllers/foodController.js";

const router = express.Router();

// Find by Id
router.get("/:id", validate({ params: foodParamsSchema }), findById);

// Find by criteria
router.get("/", validate({ query: foodQuerySchema }), findByCriteria);

// Create
router.post("/", validate({ body: foodCreateSchema }), add);

// Update
router.put("/:id", validate({ params: foodParamsSchema, body: foodUpdateSchema }), update);

// Remove
router.delete("/:id", validate({ params: foodParamsSchema }), remove);

export default router;