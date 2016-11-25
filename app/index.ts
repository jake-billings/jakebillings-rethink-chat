//Import config
import {config} from "./config";

//Serve frontend using express
let express = require('express');
let app = express();
let server = require('http').Server(app);
app.use(express.static(config.frontendDirectory));
app.get('*', function (req, res) {
    res.redirect('/');
});

//Setup realtime backend
import socketIo = require('socket.io');
let io = socketIo(server);
import {bootstrap} from "./backend/index"
bootstrap(io);

//Launch the server
server.listen(config.port);
console.info(config.name + ' Running on Port ' + config.port);
