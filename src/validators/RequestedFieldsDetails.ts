import { IRequestedFieldsDetails } from "./IRequestedFieldsDetails";

export class RequestedFieldsDetails implements IRequestedFieldsDetails {
    
    /**
     * São os detalhes dos parâmetros de um request específico.
     * Quais parâmetros são necessários para a operação? Quais são opcionais? etc.
     * Será útil para a validação.
     */

     requiredFields: string[] | null;
     optionalFields: string[] | null;
     acceptableFields: string[];

    constructor(requiredFields?: Array<string>, optionalFields?: Array<string>){

        this.requiredFields = requiredFields || null;
        this.optionalFields = optionalFields || null;
        this.acceptableFields = new Array<string>().concat(requiredFields || [], optionalFields || []);

    }

}