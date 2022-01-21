import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserTaskCreationController } from '../../controllers/UserTaskCreationController';
import { GetAllUserTasksController } from '../../controllers/GetAllUserTasksController';
import { GetUserTaskController } from '../../controllers/GetUserTaskController';
import { UserTaskUpdateController } from '../../controllers/UserTaskUpdateController';
import { UserTaskRemovalController } from '../../controllers/UserTaskRemovalController';

const usersTasksRouter = Router({ mergeParams: true });

/** at UserTaskSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/tasks"
 */
 usersTasksRouter.post("/",
 new UserAuthenticationMiddleware().requireAuthenticatedUser,
 new AccessPermissionMiddleware().strictToOwner,
 new UserTaskCreationController().handle
);

/** at UserTaskSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/tasks"
 */
usersTasksRouter.get("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new GetAllUserTasksController().handle
);

/** at UserTaskSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/tasks/{taskUid}"
 */
usersTasksRouter.get("/:taskUid",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new GetUserTaskController().handle
);

/** at UserTaskSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/tasks/{taskUid}"
 */
usersTasksRouter.patch("/:taskUid",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserTaskUpdateController().handle
);

/** at UserTaskSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/tasks/{taskUid}"
 */
usersTasksRouter.delete("/:taskUid",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserTaskRemovalController().handle
);

export { usersTasksRouter };