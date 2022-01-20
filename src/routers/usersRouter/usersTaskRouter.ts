import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserTaskCreationController } from '../../controllers/UserTaskCreationController';
import { GetAllUserTasksController } from '../../controllers/GetAllUserTasksController';
import { GetUserTaskController } from '../../controllers/GetUserTaskController';
import { UserTaskUpdateController } from '../../controllers/UserTaskUpdateController';
import { UserTaskRemovalController } from '../../controllers/UserTaskRemovalController';

const usersTasksRouter = Router({ mergeParams: true });

/**
 * @swagger
 * 
 * /api/users/{userUid}/tasks:
 *  get:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Returns a paginated list containing ALL of the tasks made by a specific user. You can navigate with either the offset or the cursor technique. If no params are sent, the cursor technique is applied by default. This list can only be accessed by the task's creator.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *          - name: page
 *            in: query
 *            required: false
 *            type: integer
 *          - name: limit
 *            in: query
 *            required: false
 *            type: integer
 *          - name: cursor
 *            in: query
 *            required: false
 *            type: integer
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserProfileUpdateResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersTasksRouter.get("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new GetAllUserTasksController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/tasks/{taskUid}:
 *  get:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Returns a specific user's task. A task can only be accessed by it's creator.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *          - name: taskUid
 *            in: path
 *            description: The UID of a User's Task.
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/GetUserTaskResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersTasksRouter.get("/:taskUid",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new GetUserTaskController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/tasks:
 *  post:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to create a new user's task. The user must be authenticated.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserTaskCreationModel'
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserTaskCreationResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersTasksRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserTaskCreationController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/tasks/{taskUid}:
 *  patch:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to update a user's task. The user must be authenticated. Only the task's creator can use this end-point.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *          - name: taskUid
 *            in: path
 *            description: The UID of a User's Task.
 *            required: true
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              'application/json':
 *                  schema:
 *                      '$ref': '#/components/schemas/UserTaskUpdateModel'
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserTaskUpdateResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersTasksRouter.patch("/:taskUid",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserTaskUpdateController().handle
);

/**
 * @swagger
 * 
 * /api/users/{userUid}/tasks/{taskUid}:
 *  delete:
 *      tags: ["TodoList API - USER END-POINTS"]
 *      description: Use this end-point to remove a user's task. The user must be authenticated. Only the task's creator can use this end-point.
 *      parameters: 
 *          - name: userUid
 *            in: path
 *            description: The UID of an User Account.
 *            required: true
 *            type: string
 *          - name: taskUid
 *            in: path
 *            description: The UID of a User's Task.
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: A successful response.
 *              content:
 *                  'application/json':
 *                      schema:
 *                          '$ref': '#/components/schemas/UserTaskRemovalResponse'
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
usersTasksRouter.delete("/:taskUid",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserTaskRemovalController().handle
);

export { usersTasksRouter };