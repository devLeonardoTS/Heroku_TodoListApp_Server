import { Task } from "@prisma/client";
import { IDisplayableTaskData } from "./IDisplayableTaskData";

export class DisplayableTaskData implements IDisplayableTaskData {
    id: string;
    creatorId: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;

    constructor(task: Task){
        const { id, creatorId, description, status, createdAt, updatedAt, completedAt } = task;
        this.id = id;
        this.creatorId = creatorId;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt.toString();
        this.updatedAt = updatedAt.toString();
        this.completedAt = completedAt ? completedAt.toString() : "";
    }
}