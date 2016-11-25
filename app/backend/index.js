"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const r = require('rethinkdb');
const SocketIO_frontend_1 = require("./Frontend/SocketIO.frontend");
const Chat_room_1 = require("./Chat/Chat.room");
const RethinkDbConnection_1 = require("./Database/RethinkDB/RethinkDbConnection");
const RethinkDbTable_1 = require("./Database/RethinkDB/RethinkDbTable");
const User_room_1 = require("./User/User.room");
function bootstrap(io) {
    return __awaiter(this, void 0, void 0, function* () {
        let conn = new RethinkDbConnection_1.RethinkDbConnection(yield r.connect({ host: 'localhost', port: 28015 }));
        let chatRoom = new Chat_room_1.ChatRoom(conn, new SocketIO_frontend_1.SocketIOFrontend(io.of('/Chat')), new RethinkDbTable_1.RethinkDbTable('Chat'));
        let userRoom = new User_room_1.UserRoom(conn, new SocketIO_frontend_1.SocketIOFrontend(io.of('/User')), new RethinkDbTable_1.RethinkDbTable('User'));
    });
}
exports.bootstrap = bootstrap;
;
//# sourceMappingURL=index.js.map