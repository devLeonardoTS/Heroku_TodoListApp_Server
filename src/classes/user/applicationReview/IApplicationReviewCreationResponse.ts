import { IDisplayableApplicationReviewData } from "./IDisplayableApplicationReviewData";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      ApplicationReviewCreationResponse:
 *          type: object
 *          properties:
 *              applicationReview:
 *                  type: object
 *                  '$ref': "#/components/schemas/DisplayableApplicationReviewData"
 *          example:
 *              applicationReview: 
 *                  uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  creatorUid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  commentary: There are thousands of ToDo List Apps out there, but this one is marvelous!
 *                  rate: 5
 *                  createdAt: Thu Jan 20 2022 17:08:13 GMT-0300 (GMT-03:00)
 *                  updatedAt: Thu Jan 20 2022 17:08:13 GMT-0300 (GMT-03:00)
 *                  active: true
 */

export interface IApplicationReviewCreationResponse {
    applicationReview: IDisplayableApplicationReviewData;
}