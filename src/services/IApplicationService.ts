export interface IApplicationService<PromiseReturnType> {
    execute(...args: any[]): Promise<PromiseReturnType | null>;
}