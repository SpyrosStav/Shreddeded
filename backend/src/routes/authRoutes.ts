import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { loginRequestSchema } from "../dtos/auth/login.validation.js";
import { login, logout } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = Router();

router.post("/login", loginLimiter, validate({ body: loginRequestSchema }), login);

router.post("/logout", authenticate, logout);

export default router;