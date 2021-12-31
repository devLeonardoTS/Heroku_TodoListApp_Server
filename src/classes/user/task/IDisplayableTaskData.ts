export interface IDisplayableTaskData {
    id: string;
    creatorId: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
}