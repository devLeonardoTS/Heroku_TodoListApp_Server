import multer from 'multer';
import { Router } from 'express';
import { UserAuthenticationMiddleware } from '../../middlewares/UserAuthenticationMiddleware';
import { GetUserProfileController } from '../../controllers/GetUserProfileController';
import { UserProfileCreationController } from '../../controllers/UserProfileCreationController';
import { AccessPermissionMiddleware } from '../../middlewares/AccessPermissionMiddleware';
import { UserProfileUpdateController } from '../../controllers/UserProfileUpdateController';
import { multerAvatarUploadConfigs } from '../../apis/multer';
import { UserProfileAvatarUploadController } from '../../controllers/UserProfileAvatarUploadController';

const usersProfileRouter = Router({ mergeParams: true });

/** at UserProfileSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/profile"
 */
usersProfileRouter.get("/", 
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new GetUserProfileController().handle
);

/** at UserProfileSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/profile"
 */
usersProfileRouter.post("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new UserProfileCreationController().handle
);

/** at UserProfileSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/profile"
 */
usersProfileRouter.patch("/",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    new UserProfileUpdateController().handle
);

/** at UserProfileSpecs.yaml
 * @swagger
 * 
 * $ref: "#/api/users/{userUid}/profile/avatar"
 */
usersProfileRouter.patch("/avatar",
    new UserAuthenticationMiddleware().requireAuthenticatedUser,
    new AccessPermissionMiddleware().strictToOwner,
    multer(multerAvatarUploadConfigs).single("avatar"),
    new UserProfileAvatarUploadController().handle
);


export { usersProfileRouter };