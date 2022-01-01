import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserTaskCreationController } from '../../controllers/UserTaskCreationController';
import { GetAllUserTasksController } from '../../controllers/GetAllUserTasksController';
import { GetUserTaskController } from '../../controllers/GetUserTaskController';
import { TaskUpdateController } from '../../controllers/TaskUpdateController';

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

usersTasksRouter.patch("/:taskId",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new TaskUpdateController().handle
);

export { usersTasksRouter };