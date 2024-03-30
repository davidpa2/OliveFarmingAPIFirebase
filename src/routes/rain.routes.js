import { Router } from "express";

import RainController from "#Controllers/RainController.js";

const rainRouter = Router();

/**
 * @openapi
 * /rain/newRainLog:
 *   post:
 *     summary: Insert a new rain log
 *     tags:
 *       - Rain
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NewRainLogSchema"
 *     responses:
 *       200:
 *         description: Added a new rain log!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       5XX:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorsSchema"
 * components:
 *   schemas:
 *     NewRainLogSchema:
 *       type: object
 *       properties:
 *         season: 
 *           type: string
 *           example: 23/24 
 *         date: 
 *           type: date
 *           example: 2023-05-03T13:17:00.000+00:00
 *         liters: 
 *           type: number
 *           example: 6
 *       required:
 *         - season
 *         - date
 *         - liters
 */
rainRouter.post("/newRainLog", RainController.newRainLog);

export default rainRouter;