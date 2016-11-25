"use strict";
//Import config
const config_1 = require("./config");
//Serve frontend using express
let express = require('express');
let app = express();
let server = require('http').Server(app);
app.use(express.static(config_1.config.frontendDirectory));
app.get('*', function (req, res) {
    res.redirect('/');
});
//Setup realtime backend
const socketIo = require('socket.io');
let io = socketIo(server);
const index_1 = require("./backend/index");
index_1.bootstrap(io);
//Launch the server
server.listen(config_1.config.port);
console.info(config_1.config.name + ' Running on Port ' + config_1.config.port);
//# sourceMappingURL=index.js.map