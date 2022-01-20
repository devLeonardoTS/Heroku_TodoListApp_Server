import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserTaskCreationResponse:
 *          type: object
 *          properties:
 *              task:
 *                  type: object
 *                  '$ref': "#/components/schemas/DisplayableUserTaskData"
 *          example:
 *              task: 
 *                  uid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  creatorUid: bb7306a5-ab5a-4485-9e40-87b94c066288
 *                  description: Check devLeonardoTS's todo list app API.
 *                  status: TODO
 *                  createdAt: Thu Jan 20 2022 17:20:10 GMT-0300 (GMT-03:00)
 *                  updatedAt: Thu Jan 20 2022 17:20:10 GMT-0300 (GMT-03:00)
 *                  completedAt: null
 */

export interface IUserTaskCreationResponse {
    task: IDisplayableUserTaskData;
}