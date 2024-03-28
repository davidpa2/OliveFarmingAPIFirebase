import { Router  } from "express";

import SeasonsController from "#Controllers/SeasonsController.js";

const seasonsRouter = Router();


seasonsRouter.post("/addSeason", SeasonsController);

export default seasonsRouter;