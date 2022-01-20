import { ETaskMessage } from "../../../constants/user/task/ETaskMessage";

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserTaskRemovalResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *          example:
 *              message: The task has been removed successfully.
 */

export interface IUserTaskRemovalResponse {
    message: ETaskMessage;
}