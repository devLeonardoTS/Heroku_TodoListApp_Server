import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { ApplicationReviewCreationController } from '../../controllers/ApplicationReviewCreationController';
import { GetUserApplicationReviewController } from '../../controllers/GetUserApplicationReviewController';
import { ApplicationReviewRemovalController } from '../../controllers/ApplicationReviewRemovalController';

const usersAppReviewRouter = Router({ mergeParams: true });

/** at ApplicationReviewSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/app_review"
 */
usersAppReviewRouter.get("/",
    new GetUserApplicationReviewController().handle
);

/** at ApplicationReviewSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/app_review"
 */
usersAppReviewRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new ApplicationReviewCreationController().handle
);

/** at ApplicationReviewSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/app_review"
 */
usersAppReviewRouter.delete("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new ApplicationReviewRemovalController().handle
);

export { usersAppReviewRouter };