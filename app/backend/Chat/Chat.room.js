module.exports = function (io) {
    var nsp = io.of('/Chat');

    var r = require('rethinkdb');
    var chats = r.table('chats');


    r.connect({host: 'localhost', port: 28015}, function (err, conn) {
        if (err) throw err;

        nsp.on('connection', function (socket) {
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
                        nsp.emit('update', row.new_val);
                    } else {
                        nsp.emit('create', row.new_val);
                    }
                } else {
                    nsp.emit('delete', row.old_val);
                }
            });
        });
    });

};
