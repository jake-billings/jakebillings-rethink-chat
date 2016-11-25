import r = require('rethinkdb');
import {SocketIOFrontend} from "./Frontend/SocketIO.frontend";
import {ChatRoom} from "./Chat/Chat.room";
import {RethinkDbConnection} from "./Database/RethinkDB/RethinkDbConnection";
import {RethinkDbTable} from "./Database/RethinkDB/RethinkDbTable";
import {UserRoom} from "./User/User.room";

export async function bootstrap(io: SocketIO.Server) {
    let conn = new RethinkDbConnection(await r.connect({host: 'localhost', port: 28015}));

    let chatRoom = new ChatRoom(conn, new SocketIOFrontend(io.of('/Chat')), new RethinkDbTable('Chat'));
    let userRoom = new UserRoom(conn, new SocketIOFrontend(io.of('/User')), new RethinkDbTable('User'));
};