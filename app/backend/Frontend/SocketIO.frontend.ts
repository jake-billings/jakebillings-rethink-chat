import {Frontend} from "./Frontend";
import {DatabaseEvent} from "../Database/DatabaseEvent";
import {FrontendListener} from "./FrontendListener";

export class SocketIOFrontend implements Frontend {
    readonly namespace: SocketIO.Namespace;

    eventListeners: FrontendListener[] = [];

    constructor(namespace: SocketIO.Namespace) {
        this.namespace = namespace;

        this.namespace.on('connection', (socket: SocketIO.Socket) => {
            this.eventListeners.forEach((eventListener: FrontendListener) => {
                eventListener.onConnect(socket);
            });

            socket.on('create', (data: any) => {
                this.eventListeners.forEach((eventListener: FrontendListener) => {
                    eventListener.onCreate(data);
                });
            });
            socket.on('update', (data: any) => {
                this.eventListeners.forEach((eventListener: FrontendListener) => {
                    eventListener.onUpdate(data);
                });
            });
            socket.on('delete', (data: any) => {
                this.eventListeners.forEach((eventListener: FrontendListener) => {
                    eventListener.onDelete(data);
                });
            });
        });
    }

    emit(event: DatabaseEvent) {
        return this.namespace.emit(event.name,event.data);
    }

    addFrontendListener(listener: FrontendListener) {
        this.eventListeners.push(listener);
    }
}