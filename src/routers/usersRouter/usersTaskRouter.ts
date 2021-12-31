import { response, Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { GetUserProfileController } from '../../controllers/GetUserProfileController';
import { UserProfileCreationController } from '../../controllers/UserProfileCreationController';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserTaskCreationController } from '../../controllers/UserTaskCreationController';
import { GetAllUserTasksController } from '../../controllers/GetAllUserTasksController';
import { GetUserTaskController } from '../../controllers/GetUserTaskController';

const usersTasksRouter = Router({ mergeParams: true });

usersTasksRouter.get("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new GetAllUserTasksController().handle
);

usersTasksRouter.get("/:taskId",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new GetUserTaskController().handle
);

usersTasksRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserTaskCreationController().handle
);

export { usersTasksRouter };