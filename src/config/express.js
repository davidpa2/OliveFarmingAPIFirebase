import express from 'express'
import seasonsRouter from '#Routes/seasons.routes.js'
import usersRouter from '#Root/routes/users.routes.js';
import rainRouter from '#Root/routes/rain.routes.js';

const expressApp = express();

//Middleware
expressApp.use(express.json());

//Routes
expressApp.use("/users", usersRouter);
expressApp.use('/seasons', seasonsRouter);
expressApp.use('/rain', rainRouter);

export default expressApp;