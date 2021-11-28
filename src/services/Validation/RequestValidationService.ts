import { HttpError } from '../../errors/HttpError';
import { IApplicationService } from '../IApplicationService';
import { IRequestValidationServiceArgs } from './IRequestValidationServiceArgs';

export class RequestValidationService implements IApplicationService<HttpError> {

    async execute(args: IRequestValidationServiceArgs): Promise<HttpError | null> {
     
        let error: HttpError | null;

        error = await args.validator.checkForEmptyData(args.receivedData, args.requiredDataFields);
        if (error){ return error; }

        error = await args.validator.checkForRequiredDataFields(args.receivedData, args.requiredDataFields);
        if (error){ return error; }

        error = await args.validator.checkForValuelessAcceptableDataFields(args.receivedData, args.acceptableDataFields);
        if (error){ return error; }
        
        return null;

    }

}