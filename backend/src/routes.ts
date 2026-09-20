import express from "express";
import loginRoutes from "./modules/auth/authRoutes.js";
import foodRoutes from "./modules/food/foodRoutes.js";
import userRoutes from "./modules/user/userRoutes.js";

const router = express.Router();

router.use("/auth", loginRoutes);
router.use("/users", userRoutes);
router.use("/foods", foodRoutes);

export default router;