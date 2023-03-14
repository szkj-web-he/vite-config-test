export interface requestDataType<T> {
    message: string;
    data: T;
    isLoading: boolean;
    status: boolean;
}
export interface ResponseResultType<T = Record<string, unknown>> {
    data: T;
    message: string;
    status: boolean | null;
    isLoading: boolean;
}
