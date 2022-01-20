import { Task } from "@prisma/client";
import { IDisplayableUserTaskData } from "./IDisplayableUserTaskData";

export class DisplayableUserTaskData implements IDisplayableUserTaskData {
    uid: string;
    creatorUid: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;

    constructor(task: Task){
        const { uid, creatorUid, description, status, createdAt, updatedAt, completedAt } = task;
        this.uid = uid;
        this.creatorUid = creatorUid;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt.toString();
        this.updatedAt = updatedAt.toString();
        this.completedAt = completedAt ? completedAt.toString() : null;
    }
}