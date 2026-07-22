import express from "express";
import foodRoutes from "./foodRoutes.js";
import loginRoutes from "./authRoutes.js"

const router = express.Router();

router.use("/foods", foodRoutes);
router.use("/auth", loginRoutes)

export default router;