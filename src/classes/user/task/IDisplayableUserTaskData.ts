/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      DisplayableUserTaskData:
 *          type: object
 *          properties:
 *              uid:
 *                  type: string
 *              creatorUid:
 *                  type: string
 *              description:
 *                  type: string
 *              status:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *              completedAt:
 *                  type: string
 *          example:
 *              uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *              creatorUid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *              description: Check devLeonardoTS's todo list API.
 *              status: TODO or STARTED or STRUGGLING or DONE.
 *              createdAt: Thu Jan 20 2022 17:08:13 GMT-0300 (GMT-03:00)
 *              updatedAt: Thu Jan 20 2022 17:08:13 GMT-0300 (GMT-03:00)
 *              completedAt: null
 */

export interface IDisplayableUserTaskData {
    uid: string;
    creatorUid: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
}