/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      UserTaskCreationModel:
 *          type: object
 *          properties:
 *              description:
 *                  type: string
 *          required:
 *              - description
 *          example:
 *              description: Check devLeonardoTS's todo list app API.
 */

export interface IUserTaskCreationModel {
    creatorUid: string;
    description: string;
}