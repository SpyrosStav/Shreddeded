import express from "express";
import { create, findByCriteria, findById, remove, update } from "./mealController.js";
import { mealCreateSchema, mealParamsSchema, mealQuerySchema, mealUpdateSchema } from "./meal.validation.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validate } from "../../middleware/validateRequest.js";

const router = express.Router();

// Find by Id
router.get("/:id", authenticate, validate({ params: mealParamsSchema }), findById);

// Find by criteria
router.get("/", authenticate, validate({ query: mealQuerySchema }), findByCriteria);

// Create
router.post("/", authenticate, validate({ body: mealCreateSchema }), create);

// Update
router.put("/:id", authenticate, validate({ params: mealParamsSchema, body: mealUpdateSchema }), update);

// Remove
router.delete("/:id", authenticate, validate({ params: mealParamsSchema }), remove);

export default router;