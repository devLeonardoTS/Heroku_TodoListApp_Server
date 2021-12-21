import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { EDatabaseErrorMessage } from "../constants/EDatabaseErrorMessage";
import { EDatabaseErrorStatus } from "../constants/EDatabaseErrorStatus";
import { DatabaseError } from "../errors/DatabaseError";
import { IHttpError } from "../errors/IHttpError";

export abstract class PrismaErrorUtils {

    public static handle(error: any): IHttpError {

        const isDevelopmentEnv = process.env.NODE_ENV === "development";

        if (error instanceof PrismaClientKnownRequestError){

            const errorArr: Array<string> = error.message.split("\n");
            const errorMsg = errorArr[errorArr.length - 1]?.trim() || error.message;

            if (error.code === "P2002") {
                return new DatabaseError(
                    EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
                    EDatabaseErrorMessage.DATABASE_ALREADY_INSERTED_ERROR,
                    isDevelopmentEnv ? {...error, message: errorMsg} : undefined
                );
            }
        }

        return new DatabaseError(
            EDatabaseErrorStatus.DATABASE_INSERTION_ERROR,
            EDatabaseErrorMessage.DATABASE_INSERTION_ERROR,
            isDevelopmentEnv ? error : undefined
        );

    }

}