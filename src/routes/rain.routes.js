import { Router } from "express";

import RainController from "#Controllers/RainController.js";

import userJWTDTO from '#Dto/user-jwt-dto.js';

const rainRouter = Router();


/**
 * @openapi
 * /rain/findBySeason/{season}:
 *   get:
 *     security:
 *       - ApiKey: []
 *     summary: Get all the rain logs of a season
 *     tags:
 *       - Rain
 *     parameters:
 *       - in: path
 *         name: season
 *         required: true
 *         description: Season code
 *         schema:
 *           type: string
 *           example: 22/23
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: date
 *                     description: Date of the rain log.
 *                     example: 2023-05-22T13:17:00.000+00:00
 *                   liters:
 *                     type: integer
 *                     description: Liters of the log.
 *                     example: 8
 *                   season:
 *                     type: string
 *                     description: Rainy season.
 *                     example: 23/24
 *       5XX:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorsSchema"
 */
rainRouter.get("/findBySeason/:season", userJWTDTO, RainController.findBySeason);

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

/**
 * @openapi
 * /rain/seasonLiters/{season}:
 *   get:
 *     security:
 *       - ApiKey: []
 *     summary: Get the count of liters of a season
 *     tags:
 *       - Rain
 *     parameters:
 *       - in: path
 *         name: season
 *         required: true
 *         description: Season code
 *         schema:
 *           type: string
 *           example: 22/23
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liters:
 *                   type: number
 *                   example: 45
 *       5XX:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorsSchema"
 */
rainRouter.get("/seasonLiters/:season", userJWTDTO, RainController.seasonLiters);

export default rainRouter;