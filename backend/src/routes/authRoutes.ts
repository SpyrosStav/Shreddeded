import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { loginRequestSchema } from "../dtos/auth/login.validation.js";
import { login } from "../controllers/authController.js";

const router = Router();

router.post("/login ", validate({ body: loginRequestSchema }), login);

export default router;