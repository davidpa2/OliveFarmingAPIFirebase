import { Router } from "express";
import UsersController from "#Root/controllers/UsersController.js";
import userJWTDTO from '#Dto/user-jwt-dto.js';

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


/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register an user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterSchema"
 *     responses:
 *       200:
 *         description: New user registered!
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
 *     RegisterSchema:
 *       type: object
 *       properties:
 *         name: 
 *           type: string
 *           example: David 
 *         surname:
 *           type: string
 *           example: Padilla
 *         email:
 *           type: string
 *           example: david@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *  
 *     ErrorsSchema:
 *       type: object
 *       properties:
 *         errors: 
 *           type: array
 *           items: 
 *             type: string
 *             example: Must have required property 'name'
 */
usersRouter.post("/register", UsersController.register);


/**
 * @openapi
 * /users/me:
 *   get:
 *     security:
 *       - ApiKey: []
 *     summary: Get user info
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Succesfully logged in!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProfileSchema"
 *       5XX:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorsSchema"
 * components:
 *   securitySchemes:
 *     ApiKey:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 *   schemas:
 *     ProfileSchema:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: uuid v4
 *         name: 
 *           type: string
 *           example: David 
 *         surname:
 *           type: string
 *           example: Padilla
 *         email:
 *           type: string
 *           example: david@gmail.com
 *       required:
 *         - _id
 *         - name
 *         - surname
 *         - email
 */
usersRouter.get("/me", userJWTDTO, UsersController.me);

export default usersRouter;