import { Router } from "express";
import { GetAllApplicationReviewsController } from "../../_WorkInProgress/ReviewsFeature/ApplicationReviewRetrievalFeature";

const publicRouter = Router();

publicRouter.get("/app_reviews", new GetAllApplicationReviewsController().handle);

export { publicRouter }