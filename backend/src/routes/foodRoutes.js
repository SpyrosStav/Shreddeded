import express from "express";
import {
    findById,
    findByCriteria,
    add,
    update,
    remove,
} from "../controllers/foodController.js";

const router = express.Router();

/**
 * @swagger
 * /foods/{id}:
 *   get:
 *     summary: Get food by id
 *     x-order: 1
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: Food found
 *       404:
 *         description: Food not found
 */
// Find by Id
router.get("/:id", findById);

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Get all foods
 *     x-order: 2
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: List of foods
 */
// Find by criteria
router.get("/", findByCriteria);

/**
 * @swagger
 * /foods:
 *   post:
 *     summary: Create food
 *     x-order: 3
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: Created
 */
// Create
router.post("/", add);

/**
 * @swagger
 * /foods/{id}:
 *   put:
 *     summary: Update food
 *     x-order: 4
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
// Update
router.put("/:id", update);

/**
 * @swagger
 * /foods/{id}:
 *   delete:
 *     summary: Delete food
 *     x-order: 5
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       204:
 *         description: Success
 *       404:
 *         description: Not found
 */
// Remove
router.delete("/:id", remove);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         calories:
 *           type: number
 *         protein:
 *           type: number
 *         carbs:
 *           type: number
 *         fat:
 *           type: number
 *         fiber:
 *           type: number
 *         userId:
 *           type: string
 *           format: uuid
 *       required:
 *         - name
 */
