import { Router } from 'express';
import { usersProfileRouter } from './usersProfileRouter';
import { usersTasksRouter } from './usersTaskRouter';
import { usersAppReviewRouter } from './usersAppReviewRouter';
import { UserAccountCreationController } from '../../controllers/UserAccountCreationController';
import { usersAccountRouter } from './usersAccountRouter';
import { usersLoginRouter } from './usersLoginRouter';
import { usersLogoutRouter } from './usersLogoutRouter';

const usersBaseRouter = Router({ mergeParams: true });

/**
 * @swagger
 * 
 * /api/users/:
 *  post:
 *      tags: ["TodoList API - PUBLIC END-POINTS"]
 *      description: Use this end-point to create a new user's account. Remember your user to store the provided Account Recovery Token in a safe place.
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserAccountCreationModel'
 *      responses:
 *          200: 
 *              description: A successful response.
 *              content: 
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserAccountCreationResponse'
 *          400:
 *              description: A bad request response.
 *          404:
 *              description: A not found request response.
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersBaseRouter.post("/", new UserAccountCreationController().handle);

usersBaseRouter.use("/accounts", usersAccountRouter);

usersBaseRouter.use("/login", usersLoginRouter);

usersBaseRouter.use("/logout", usersLogoutRouter);

usersBaseRouter.use("/:userUid/profile", usersProfileRouter);

usersBaseRouter.use("/:userUid/tasks", usersTasksRouter);

usersBaseRouter.use("/:userUid/app_review", usersAppReviewRouter);

export { usersBaseRouter }