import {DatabaseEvent} from "../Database/DatabaseEvent";

export interface EmitFunction {
    (event: DatabaseEvent);
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