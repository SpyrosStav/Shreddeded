import express from "express";
import { validate } from "../middleware/validateRequest.js";
import { foodParamsSchema, foodQuerySchema, foodCreateSchema, foodUpdateSchema } from "../dtos/food/food.validation.js";
import { findById, findByCriteria, create, update, remove } from "../controllers/foodController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Find by Id
router.get("/:id", authenticate, validate({ params: foodParamsSchema }), findById);

// Find by criteria
router.get("/", authenticate, validate({ query: foodQuerySchema }), findByCriteria);

// Create
router.post("/", authenticate, validate({ body: foodCreateSchema }), create);

// Update
router.put("/:id", authenticate, validate({ params: foodParamsSchema, body: foodUpdateSchema }), update);

// Remove
router.delete("/:id", authenticate, validate({ params: foodParamsSchema }), remove);

export default router;