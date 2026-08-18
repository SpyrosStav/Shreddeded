import { Router } from "express";
import { validate } from "../middleware/validateRequest.js";
import { loginRequestSchema } from "../dtos/auth/login.validation.js";
import { login, logout } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/login", validate({ body: loginRequestSchema }), login);

router.post("/logout", authenticate, logout);

export default router;