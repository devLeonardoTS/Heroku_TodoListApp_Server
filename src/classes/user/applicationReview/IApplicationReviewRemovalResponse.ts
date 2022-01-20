import { EApplicationReviewMessage } from "../../../constants/user/applicationReview/EApplicationReviewMessage";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      ApplicationReviewRemovalResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *          example:
 *              message: The review has been remove successfully.
 */

export interface IApplicationReviewRemovalResponse {
    message: EApplicationReviewMessage;
}