import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { EDatabaseErrorMessage } from "../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../errors/DatabaseError";
import { IHttpError } from "../errors/IHttpError";

export abstract class PrismaUtils {

    public static handleInsertionError(error?: Error): IHttpError {

        const isDevelopmentEnv = process.env.NODE_ENV === "development";

        if (error instanceof PrismaClientKnownRequestError){

            const errorArr: Array<string> = error.message.split("\n");
            const errorMsg = errorArr[errorArr.length - 1]?.trim() || error.message;

            if (error.code === "P2002") {
                return new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                    EDatabaseErrorMessage.DATABASE_ALREADY_INSERTED_ERROR,
                    isDevelopmentEnv ? error ? {...error, message: errorMsg} : undefined : undefined
                );
            }
        }

        return new DatabaseError(
            EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
            EDatabaseErrorMessage.DATABASE_INSERTION_ERROR,
            isDevelopmentEnv ? error || undefined : undefined
        );

    }

    public static handleRetrievalError(error?: Error): IHttpError {

        const isDevelopmentEnv = process.env.NODE_ENV === "development";

        return new DatabaseError(
            EDatabaseErrorStatus.DATABASE_RETRIEVAL_ERROR,
            EDatabaseErrorMessage.DATABASE_RETRIEVAL_ERROR,
            isDevelopmentEnv ? error || undefined : undefined
        );
        
    }

    public static handleUpdateError(error?: Error): IHttpError {

        const isDevelopmentEnv = process.env.NODE_ENV === "development";

        return new DatabaseError(
            EDatabaseErrorStatus.DATABASE_UPDATE_ERROR,
            EDatabaseErrorMessage.DATABASE_UPDATE_ERROR,
            isDevelopmentEnv ? error || undefined : undefined
        );

    }

    public static handleRemovalError(error?: Error): IHttpError {

        const isDevelopmentEnv = process.env.NODE_ENV === "development";

        return new DatabaseError(
            EDatabaseErrorStatus.DATABASE_REMOVAL_ERROR,
            EDatabaseErrorMessage.DATABASE_REMOVAL_ERROR,
            isDevelopmentEnv ? error || undefined : undefined
        );

    }

    public static handleTransactionError(error?: Error): IHttpError {

        const isDevelopmentEnv = process.env.NODE_ENV === "development";

        return new DatabaseError(
            EDatabaseErrorStatus.DATABASE_TRANSACTION_ERROR,
            EDatabaseErrorMessage.DATABASE_TRANSACTION_ERROR,
            isDevelopmentEnv ? error || undefined : undefined
        );

    }

}