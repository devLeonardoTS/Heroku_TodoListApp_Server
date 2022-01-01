import { TaskStatus } from "@prisma/client";

export abstract class TaskConstants {

    public static readonly TASK_ID: string = "id";
    public static readonly CREATOR_ID: string = "creatorId";
    public static readonly DESCRIPTION: string = "description";
    public static readonly STATUS: string = "status";

    public static readonly STATUS_POSSIBLE_VALUES: Array<string> = [
        TaskStatus.TODO,
        TaskStatus.STARTED,
        TaskStatus.STRUGGLING,
        TaskStatus.DONE
    ];

    public static readonly TASK_ID_MAX_LENGTH: number = 36;
    public static readonly TASK_ID_MIN_LENGTH: number = 36;

    public static readonly CREATOR_ID_MAX_LENGTH: number = 36;
    public static readonly CREATOR_ID_MIN_LENGTH: number = 36;

    public static readonly DESCRIPTION_MAX_LENGTH: number = 255;
    public static readonly DESCRIPTION_MIN_LENGTH: number = 1;

}