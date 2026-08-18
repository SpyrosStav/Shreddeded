import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { createUserRequestSchema, updateUserRequestSchema, userParamsSchema, userQuerySchema } from "../dtos/user/user.validation.js";
import { add, update, findById, remove, findByCriteria } from "../controllers/userController.js";

const router = Router();

// Find by Id
router.get("/:id", validate({ params: userParamsSchema }), findById);

// Find by criteria
router.get("/", validate({ query: userQuerySchema }), findByCriteria);

// Create
router.post("/", validate({ body: createUserRequestSchema }), add);

// Update
router.put("/:id", validate({ params: userParamsSchema, body: updateUserRequestSchema }), update);

// Remove
router.delete("/:id", validate({ params: userParamsSchema }), remove);

export default router;