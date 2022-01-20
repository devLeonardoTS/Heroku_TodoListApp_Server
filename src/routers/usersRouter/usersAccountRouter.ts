import { Router } from 'express';
import { UserAccountRecoveryController } from '../../controllers/UserAccountRecoveryController';

const usersAccountRouter = Router({ mergeParams: true });

/**
 * @swagger
 * 
 * /api/users/accounts/recovery:
 *  patch:
 *      tags: ["TodoList API - PUBLIC END-POINTS"]
 *      description: Use this end-point to allow your user to recover their account.
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserAccountRecoveryModel'
 *      responses:
 *          200: 
 *              description: A successful response.
 *              content: 
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserAccountRecoveryResponse'
 *          400:
 *              description: A bad request response.
 *          404:
 *              description: A not found request response.
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersAccountRouter.patch("/recovery", new UserAccountRecoveryController().handle);

export { usersAccountRouter };