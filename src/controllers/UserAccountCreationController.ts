import { Request, Response, NextFunction } from 'express';
import { IDisplayableUserAccountData } from '../classes/user/account/IDisplayableUserAccountData';
import { IUserAccountCreationModel } from '../models/user/account/IUserAccountCreationModel';
import { EHttpStatusCode } from '../constants/EHttpStatusCode';
import { UnexpectedError } from '../errors/UnexpectedError';
import { IApplicationService } from '../services/IApplicationService';
import { UserAccountCreationPersistenceService } from '../services/user/account/UserAccountCreationPersistenceService';
import { IValidatableData } from '../validators/IValidatableData';
import { IValidator } from '../validators/IValidator';
import { UserAccountCreationValidatableData } from '../validators/users/account/UserAccountCreationValidatableData';
import { UserAccountCreationValidator } from '../validators/users/account/UserAccountCreationValidator';

export class UserAccountCreationController {

	async handle(request: Request, response: Response, next: NextFunction){

		const validatableData: IValidatableData = new UserAccountCreationValidatableData(request.body);
		const validator: IValidator<IUserAccountCreationModel> = new UserAccountCreationValidator(validatableData);

		await validator.execute();

		if (!validator.result){
			if (validator.error){ return next(validator.error); }
			return next(new UnexpectedError());
		}

		const persistenceService: IApplicationService<IDisplayableUserAccountData> = new UserAccountCreationPersistenceService(validator.result);
		const isDataPersisted = await persistenceService.execute();
		if (!isDataPersisted){
		if (persistenceService.error){ return next(persistenceService.error); }
		return next(new UnexpectedError());
		}
		if (!persistenceService.result){ return next(new UnexpectedError()); }

		return response.status(EHttpStatusCode.OK).json({ 
			message: "All green! New user account created.", 
			newUserAccount: persistenceService.result 
		});

	}

}



















// import { Request, Response, NextFunction } from "express";
// import { ISafeUserAccountDataDisplay } from "../classes/user/account/ISafeUserAccountDataDisplay";
// import { IUserAccountCreationData } from "../classes/user/account/IUserAccountCreationData";
// import { EHttpStatusCode } from "../constants";
// import { UnexpectedError } from "../errors/UnexpectedError";
// import { IApplicationService } from "../services/IApplicationService";
// import { UserAccountCreationPersistenceService } from "../services/user/account/UserAccountCreationPersistenceService";
// import { UserAccountCreationValidationService } from "../services/user/account/UserAccountCreationValidationService";
// import { IValidator } from "../validators/IValidator";
// import { UserAccountCreationValidator } from "../validators/user/account/UserAccountCreationValidator";


// export class UserAccountCreationController {

//   async handle(request: Request, response: Response, next: NextFunction){

//     const validationService: IApplicationService<IUserAccountCreationData> = new UserAccountCreationValidationService(request.body);

//     const isDataValidated = await validationService.execute();
//     if (!isDataValidated){
//       if (validationService.error) { return next(validationService.error); }
//       return next(new UnexpectedError());
//     }
//     if (!validationService.result){ return next(new UnexpectedError()); }

//     const persistenceService: IApplicationService<ISafeUserAccountDataDisplay> = new UserAccountCreationPersistenceService(validationService.result);
//     const isDataPersisted = await persistenceService.execute();
//     if (!isDataPersisted){
//       if (persistenceService.error){ return next(persistenceService.error); }
//       return next(new UnexpectedError());
//     }
//     if (!persistenceService.result){ return next(new UnexpectedError()); }

//     return response.status(EHttpStatusCode.OK).json({ message: "All green! New user account created.", newUserAccount: persistenceService.result });

//   }

// }