/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserTaskUpdateModel:
 *          type: object
 *          properties:
 *              description:
 *                  type: string
 *              status:
 *                  type: string
 *          example:
 *              description: Check devLeonardoTS's todo list app API.
 *              status: TODO or STARTED or STRUGGLING or DONE.
 */

export interface IUserTaskUpdateModel {
    uid: string,
    description: string | undefined,
    status: string | undefined
}