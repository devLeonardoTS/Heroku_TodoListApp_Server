import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { ApplicationReviewCreationController } from '../../controllers/ApplicationReviewCreationController';
import { GetUserApplicationReviewController } from '../../controllers/GetUserApplicationReviewController';
import { ApplicationReviewRemovalController } from '../../controllers/ApplicationReviewRemovalController';

const usersAppReviewRouter = Router({ mergeParams: true });

usersAppReviewRouter.get("/",
    new GetUserApplicationReviewController().handle
);

usersAppReviewRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new ApplicationReviewCreationController().handle
);

usersAppReviewRouter.delete("/:appReviewUid",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new ApplicationReviewRemovalController().handle
);

export { usersAppReviewRouter };