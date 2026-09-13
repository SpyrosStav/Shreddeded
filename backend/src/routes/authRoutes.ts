import { Router } from "express";
import { login, logout } from "../controllers/authController.js";
import { loginRequestSchema } from "../dtos/auth/login.validation.js";
import { authenticate } from "../middleware/authenticate.js";
import { loginLimiter } from "../middleware/loginLimiter.js";
import { validate } from "../middleware/validateRequest.js";

const router = Router();

router.post("/login", loginLimiter, validate({ body: loginRequestSchema }), login);

router.post("/logout", authenticate, logout);

export default router;