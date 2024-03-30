import { Router } from "express";

import SeasonsController from "#Controllers/SeasonsController.js";

const seasonsRouter = Router();

/**
 * @openapi
 * /seasons/addSeason:
 *   post:
 *     summary: Add a new agricultural season
 *     tags:
 *       - Seasons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AddSeasonSchema"
 *     responses:
 *       200:
 *         description: Added a new Season!
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
 *     AddSeasonSchema:
 *       type: object
 *       properties:
 *         seasonCode: 
 *           type: string
 *           example: 23/24 
 *       required:
 *         - seasonCode
 *  
 *     ErrorsSchema:
 *       type: object
 *       properties:
 *         errors: 
 *           type: array
 *           items: 
 *             type: string
 *             example: Something went wrong...
 */
seasonsRouter.post("/addSeason", SeasonsController.addSeason);

/**
 * @openapi
 * /seasons/seasonsCount:
 *   get:
 *     summary: Get the count of all seasons
 *     tags:
 *       - Seasons
 *     responses:
 *       200:
 *         description: Added a new Season!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seasonCount:
 *                   type: number
 *                   example: 3
 *       5XX:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorsSchema"
 */
seasonsRouter.get("/seasonsCount", SeasonsController.seasonsCount);

export default seasonsRouter;