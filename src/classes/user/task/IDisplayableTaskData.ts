export interface IDisplayableTaskData {
    uid: string;
    creatorUid: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
}