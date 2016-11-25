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
function bootstrap(io) {
    return __awaiter(this, void 0, void 0, function* () {
        let conn = yield r.connect({ host: 'localhost', port: 28015 });
        let frontend = new SocketIO_frontend_1.SocketIOFrontend(io.of('/Chat'));
        let chatRoom = new Chat_room_1.ChatRoom(conn, frontend);
    });
}
exports.bootstrap = bootstrap;
;
//# sourceMappingURL=index.js.map