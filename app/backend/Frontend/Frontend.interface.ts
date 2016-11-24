export interface EmitFunction {
    (event: string, data: any);
}
export interface ListenFunction {
    (event: string, callback: Function);
}

export interface Frontend {
    emit: EmitFunction;
    on: ListenFunction;
}