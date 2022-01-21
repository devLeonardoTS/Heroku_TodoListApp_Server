import { Router } from "express";
import { GetAllApplicationReviewsController } from "../../controllers/GetAllApplicationReviewsController";
import { GetApplicationReviewController } from "../../controllers/GetApplicationReviewController";

const publicAppReviewsRouter = Router({ mergeParams: true });

/** at ApplicationReviewSpecs.yaml
 * @swagger 
 * 
 *  "$ref": "#/api/app_reviews"
 */
publicAppReviewsRouter.get("/", new GetAllApplicationReviewsController().handle);

/** at ApplicationReviewSpecs.yaml
 * @swagger
 * 
 * "$ref": "#/api/app_reviews/{appReviewUid}"
 */
publicAppReviewsRouter.get("/:appReviewUid", new GetApplicationReviewController().handle);

export { publicAppReviewsRouter }