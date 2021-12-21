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
            console.log("[Unhandled Rejection Error]: ", error.message, "\n");
        }

        const isFileNotFoundAtRemovalError: boolean = error.message === "The specified key does not exist." && error.code === 404;
        if (isFileNotFoundAtRemovalError){

            if (isDevEnv){ 
                console.log("\nAn unhandled rejection probably happened @ Firebase Storage Api.");
                console.log("[Unhandled Rejection Error]: ", error, "\n");
                // console.log("\n[Unhandled Rejection Promise]: ", promiseData, "\n");
            }

        }

        process.removeListener("unhandledRejection", ServerUtils.fileNotFoundAtFirebaseStorageHandler);
    }

}