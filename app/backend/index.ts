import r = require('rethinkdb');
import {Frontend} from "./Frontend/Frontend.interface";
import {SocketIOFrontend} from "./Frontend/SocketIO.frontend";
import {ChatRoom} from "./Chat/Chat.room";

export async function bootstrap(io: SocketIO.Server) {
    let conn = await r.connect({host: 'localhost', port: 28015});
    let frontend = new SocketIOFrontend(io.of('/Chat'));
    let chatRoom = new ChatRoom(conn, frontend);
};