/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      DisplayableApplicationReviewData:
 *          type: object
 *          properties:
 *              uid:
 *                  type: string
 *              creatorUid:
 *                  type: string
 *              commentary:
 *                  type: string
 *              rate:
 *                  type: integer
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *              active:
 *                  type: boolean
 *          example:
 *              uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *              creatorUid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *              commentary: There are thousands of ToDo List Apps out there, but this one is marvelous!
 *              rate: 5
 *              createdAt: Thu Jan 20 2022 17:08:13 GMT-0300 (GMT-03:00)
 *              updatedAt: Thu Jan 20 2022 17:08:13 GMT-0300 (GMT-03:00)
 *              active: true
 */

export interface IDisplayableApplicationReviewData {
    uid: string;
    creatorUid: string;
    commentary: string;
    rate: number;
    createdAt: string;
    updatedAt: string;
    active: boolean;
}