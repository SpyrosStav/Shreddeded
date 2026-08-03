import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { userCreateSchema, userParamsSchema } from "../dtos/auth/user.validation.js";
import { register, updateUser, findById } from "../controllers/userController.js";

const router = Router();

// Find by Id
router.get("/:id", validate({ params: userParamsSchema }), findById);

// Create
router.post("/", validate({ body: userCreateSchema }), register);

// Update
router.put("/:id", validate({ params: userParamsSchema, body: userCreateSchema }), updateUser);

export default router;