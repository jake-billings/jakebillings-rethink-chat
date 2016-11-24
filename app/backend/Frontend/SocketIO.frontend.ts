import {Frontend} from "./Frontend.interface";

export class SocketIOFrontend implements Frontend {
    readonly namespace: SocketIO.Namespace;

    constructor(namespace: SocketIO.Namespace) {
        this.namespace = namespace;
    }

    emit(event,data) {
        return this.namespace.emit(event,data);
    }
    on(event,callback) {
        return this.namespace.on(event,callback);
    }
}