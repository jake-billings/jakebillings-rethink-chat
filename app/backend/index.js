"use strict";
var r = require('rethinkdb');
var SocketIO_frontend_1 = require("./Frontend/SocketIO.frontend");
var Chat_room_1 = require("./Chat/Chat.room");
function bootstrap(io) {
    r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
        if (err)
            return console.error(err);
        var frontend = new SocketIO_frontend_1.SocketIOFrontend(io.of('/Chat'));
        var chatRoom = new Chat_room_1.ChatRoom(conn, frontend);
    });
}
exports.bootstrap = bootstrap;
;
//# sourceMappingURL=index.js.map