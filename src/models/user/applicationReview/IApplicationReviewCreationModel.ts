/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      ApplicationReviewCreationModel:
 *          type: object
 *          properties:
 *              commentary:
 *                  type: string
 *              rate:
 *                  type: integer
 *          required:
 *              - commentary
 *              - rate
 *          example:
 *              commentary: São milhares de ToDoList Apps, mas esse aqui tá show!
 *              rate: 0 to 5
 */

export interface IApplicationReviewCreationModel {
    creatorUid: string;
    commentary: string;
    rate: number;
}