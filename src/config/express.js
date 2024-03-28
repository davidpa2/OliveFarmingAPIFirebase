import express from 'express'
import seasonsRouter from '#Routes/seasons.routes.js'

const expressApp = express();

//Middleware
expressApp.use(express.json());

//Routes
expressApp.use('/seasons', seasonsRouter)

export default expressApp;