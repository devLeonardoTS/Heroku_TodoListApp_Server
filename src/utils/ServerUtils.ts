import { NextFunction } from "express";
import { UnexpectedError } from "../errors/UnexpectedError";

export abstract class ServerUtils {

    static ensureRequiredEnvVars(requiredEnvVars: Array<string>) {

        const environmentVariables = Object.keys(process.env);
    
        let isRequiredEnvVarMissing: boolean = false;
    
        requiredEnvVars.forEach((key) => {
            if (!isRequiredEnvVarMissing){
                if (!environmentVariables.includes(key)){
                    console.log(`\nERROR: ${key} is not set. Closing application.\n`);
                    isRequiredEnvVarMissing = true;
                }
            }
        });
    
        if (isRequiredEnvVarMissing){
            process.exit();
        }
        
    }

    static listenForApplicationExceptions(){
        process.on("unhandledRejection", ServerUtils.fileNotFoundAtFirebaseStorageHandler);
    }

    private static fileNotFoundAtFirebaseStorageHandler(error: any, promiseData: any){
        const isDevEnv: boolean = process.env.NODE_ENV === "development";

        if (isDevEnv){ 
            console.log("\nAn unhandled rejection was caught by ServerUtils.");
            console.log("[Unhandled Rejection Error]: ", error.message, error.code, "\n");
        }

        const ignorableMessages = [
            "No such object:",
            "The specified key does not exist."
        ];

        const isFirebaseStorageError: boolean = ignorableMessages.includes(error.message) && error.code === 404;
        if (isFirebaseStorageError){

            if (isDevEnv){ 
                console.log("\nAn unhandled rejection happened @ Firebase Storage Api.");
                console.log("[Unhandled Rejection Error]: ", error.stack || error.message);
            }

        }

        process.removeListener("unhandledRejection", ServerUtils.fileNotFoundAtFirebaseStorageHandler);
    }

}