export interface EmitFunction {
    (event: string, data: any);
}
export interface ListenFunction {
    (callback: Function);
}

export interface Frontend {
    emit: EmitFunction;
    onConnect: ListenFunction;
    onCreate: ListenFunction;
    onUpdate: ListenFunction;
    onDelete: ListenFunction;
}