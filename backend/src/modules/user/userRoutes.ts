import { Router } from "express";
import { Role } from "../../enums/roles.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { validate } from "../../middleware/validateRequest.js";
import { createUserRequestSchema, updateUserRequestSchema, userParamsSchema, userQuerySchema } from "./user.validation.js";
import { add, findByCriteria, findById, remove, update } from "./userController.js";

const router = Router();

// Find by Id
router.get("/:id", authenticate, validate({ params: userParamsSchema }), findById);

// Find by criteria
router.get("/", authenticate, authorizeRole(Role.ADMIN), validate({ query: userQuerySchema }), findByCriteria);

// Create
router.post("/", validate({ body: createUserRequestSchema }), add);

// Update
router.put("/:id", authenticate, validate({ params: userParamsSchema, body: updateUserRequestSchema }), update);

// Remove
router.delete("/:id", authenticate, validate({ params: userParamsSchema }), remove);

export default router;