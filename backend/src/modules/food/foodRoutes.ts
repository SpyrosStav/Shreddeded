import express from "express";
import { create, findByCriteria, findById, remove, update } from "./foodController.js";
import { foodCreateSchema, foodParamsSchema, foodQuerySchema, foodUpdateSchema } from "./food.validation.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validate } from "../../middleware/validateRequest.js";

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