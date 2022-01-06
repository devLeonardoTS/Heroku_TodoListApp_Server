import { Task } from "@prisma/client";
import { IDisplayableTaskData } from "./IDisplayableTaskData";

export class DisplayableTaskData implements IDisplayableTaskData {
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
        this.completedAt = completedAt ? completedAt.toString() : "";
    }
}