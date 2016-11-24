import r = require('rethinkdb');
import {Frontend} from "./Data/Frontend.interface";
import {SocketIOFrontend} from "./Data/SocketIO.frontend";
import {ChatRoom} from "./Chat/Chat.room";

export function bootstrap(io: SocketIO.Server) {

    r.connect({host: 'localhost', port: 28015}, function (err, conn) {
        if (err) return console.error(err);
        let frontend = new SocketIOFrontend(io.of('/Chat'));
        let chatRoom = new ChatRoom(conn,frontend);
    });
};