import { Router } from "express";
import { GetAllApplicationReviewsController } from "../../controllers/GetAllApplicationReviewsController";
import { GetApplicationReviewController } from "../../controllers/GetApplicationReviewController";

const publicAppReviewsRouter = Router({ mergeParams: true });

/**
 * @swagger
 * 
 * /api/app_reviews:
 *  get:
 *      tags: ["TodoList API - PUBLIC END-POINTS"]
 *      description: Returns a paginated list containing ALL of the application reviews made by our users. You can navigate with either the offset or the cursor technique. If no params are sent, the cursor technique is applied by default.
 *      security: []
 *      parameters: 
 *          - name: page
 *            in: query
 *            required: false
 *            type: integer
 *          - name: limit
 *            in: query
 *            required: false
 *            type: integer
 *          - name: cursor
 *            in: query
 *            required: false
 *            type: integer
 *      responses:
 *          200: 
 *              description: A successful response.
 *          400:
 *              description: A bad request response.
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
publicAppReviewsRouter.get("/", new GetAllApplicationReviewsController().handle);

/**
 * @swagger
 * 
 * /api/app_reviews/{appReviewUid}:
 *  get:
 *      tags: ["TodoList API - PUBLIC END-POINTS"]
 *      description: Returns an application review by it's UID.
 *      security: []
 *      parameters: 
 *          - name: appReviewUid
 *            in: path
 *            description: The UID of an Application Review.
 *            required: true
 *            type: string
 *      responses:
 *          200: 
 *              description: A successful response.
 *          400:
 *              description: A bad request response.
 *          404:
 *              description: A not found request response.
 *          500:
 *              description: An unexpected error. If you receive this, contact the administrator.
 */
publicAppReviewsRouter.get("/:appReviewUid", new GetApplicationReviewController().handle);

export { publicAppReviewsRouter }