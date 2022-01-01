import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserTaskCreationController } from '../../controllers/UserTaskCreationController';
import { GetAllTasksController } from '../../controllers/GetAllTasksController';
import { GetTaskController } from '../../controllers/GetTaskController';
import { TaskUpdateController } from '../../controllers/TaskUpdateController';
import { TaskRemovalController } from '../../controllers/TaskRemovalController';

const usersTasksRouter = Router({ mergeParams: true });

usersTasksRouter.get("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new GetAllTasksController().handle
);

usersTasksRouter.get("/:taskId",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new GetTaskController().handle
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

usersTasksRouter.delete("/:taskId",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new TaskRemovalController().handle
);

export { usersTasksRouter };