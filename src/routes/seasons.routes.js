import { Router  } from "express";

import SeasonsController from "#Controllers/SeasonsController.js";

const seasonsRouter = Router();
// var seasonsController = new SeasonsController();

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
 *             example: Must have required property 'seasonCode'
 */
seasonsRouter.post("/addSeason", SeasonsController.addSeason);

export default seasonsRouter;