import { Router } from "express";
import UsersController from "#Root/controllers/UsersController.js";

const usersRouter = Router();

/**
 * @openapi
 * /users/loginUser:
 *   post:
 *     summary: Login to account
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginSchema"
 *     responses:
 *       200:
 *         description: Succesfully logged in!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorsSchema"
 *       5XX:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorsSchema"
 * components:
 *   schemas:
 *     LoginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: david@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *       required:
 *         - email
 *         - password
 */
usersRouter.post("/loginUser", UsersController.loginUser);

export default usersRouter;