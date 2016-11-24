import {Frontend} from "../Frontend/Frontend.interface";
import r = require('rethinkdb');
import {Connection} from "rethinkdb";

export class ChatRoom {
    readonly frontend: Frontend;

    //todo convert to actual type
    constructor(conn: any, frontend: Frontend) {
        this.frontend = frontend;

        var chats = r.table('chats');


        frontend.on('connection', function (socket) {
            console.log('socket connected');

            chats.run(conn, function (err, cursor) {
                if (err) throw err;
                cursor.toArray(function (err, result) {
                    if (err) throw err;

                    console.log(result);
                    socket.emit('initial', result);
                });
            });

            socket.on('create', function (chat) {
                chats.insert(chat).run(conn, function (err, result) {
                    if (err) {
                        console.error(err);
                    }
                });
            });

            socket.on('update', function (chat) {
                chats.filter(r.row('id').eq(chat.id)).update(chat).run(conn, function (err, result) {
                    if (err) throw err;
                    console.log(JSON.stringify(result, null, 2));
                });
            });

            socket.on('delete', function (chat) {
                chats.filter(r.row('id').eq(chat.id)).delete().run(conn, function (err, result) {
                    if (err) throw err;
                    console.log(JSON.stringify(result, null, 2));
                });
            });
        });

        chats.changes().run(conn, function (err, cursor) {
            if (err) {
                console.error(err);
            }

            cursor.each(function (err, row) {
                console.error(err);

                console.log('change', row);


                if (row.new_val) {
                    if (row.old_val) {
                        frontend.emit('update', row.new_val);
                    } else {
                        frontend.emit('create', row.new_val);
                    }
                } else {
                    frontend.emit('delete', row.old_val);
                }
            });
        });
    }
}