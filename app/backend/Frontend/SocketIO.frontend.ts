import {Frontend} from "./Frontend.interface";

class EventListener {
    constructor(name: string, callback: Function) {
        this.name=name;
        this.callback=callback;
    }
    name: string;
    callback: Function;
}

export class SocketIOFrontend implements Frontend {
    readonly namespace: SocketIO.Namespace;

    eventListeners: EventListener[] = [];

    firstConnectionHasOccurred: boolean = false;

    constructor(namespace: SocketIO.Namespace) {
        this.namespace = namespace;
        this.onConnect((socket: SocketIO.Socket) => {
            this.eventListeners.forEach((eventListener) => {
                socket.on(eventListener.name,eventListener.callback);
            });
            this.firstConnectionHasOccurred=true;
        });
    }

    emit(event,data) {
        return this.namespace.emit(event,data);
    }

    //Socket.IO Namespace Event Listeners
    onConnect(callback) {
        return this.namespace.on('connection',callback);
    }

    addNewSocketListener(eventListener: EventListener) {
        if (this.firstConnectionHasOccurred) throw new Error('Cannot add new listeners to all sockets after first connection');
        this.eventListeners.push(eventListener);
    }

    //Socket Event Listeners
    onCreate(callback) {
        this.addNewSocketListener(new EventListener('create',callback));
    }
    onUpdate(callback) {
        this.addNewSocketListener(new EventListener('update',callback));
    }
    onDelete(callback) {
        this.addNewSocketListener(new EventListener('delete',callback));
    }
}