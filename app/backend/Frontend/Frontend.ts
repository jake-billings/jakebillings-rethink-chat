import {DatabaseEvent} from "../Database/DatabaseEvent";
import {FrontendListener} from "./FrontendListener";

export interface EmitFunction {
    (event: DatabaseEvent);
}

export interface Frontend {
    emit: EmitFunction;
    addFrontendListener: (listener: FrontendListener) => void;
}