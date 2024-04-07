import { Router } from "express";

import RainController from "#Controllers/RainController.js";

import userJWTDTO from '#Dto/user-jwt-dto.js';

const rainRouter = Router();

/**
 * @openapi
 * /rain/newRainLog:
 *   post:
 *     security:
 *       - ApiKey: []
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
rainRouter.post("/newRainLog", userJWTDTO, RainController.newRainLog);

/**
 * @openapi
 * /rain/deleteRainLog/{id}:
 *   delete:
 *     security:
 *       - ApiKey: []
 *     summary: Delete a rain log
 *     tags:
 *       - Rain
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: RainLog ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted a rain log!
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
 */
rainRouter.delete("/deleteRainLog/:id", userJWTDTO, RainController.deleteRainLog);

export default rainRouter;