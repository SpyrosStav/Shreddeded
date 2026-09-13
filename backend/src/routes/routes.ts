import express from "express";
import foodRoutes from "./foodRoutes.js";
import loginRoutes from "./authRoutes.js"
import userRoutes from "./userRoutes.js"

const router = express.Router();

router.use("/auth", loginRoutes);
router.use("/users", userRoutes);
router.use("/foods", foodRoutes);

export default router;