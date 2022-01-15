import { Router } from "express";
import { GetAllApplicationReviewsController } from "../../_WorkInProgress/ReviewsFeature/ApplicationReviewRetrievalFeature";
import { publicAppReviewsRouter } from "./publicAppReviewsRouter";

const publicRouter = Router();

publicRouter.use("/app_reviews", publicAppReviewsRouter );

export { publicRouter }