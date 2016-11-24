//Import config
var config = require('./config');

//Serve frontend using express
var express = require('express');
var app = express();
var server = require('http').Server(app);
app.use(express.static(config.frontendDirectory));
app.get('*', function (req, res) {
    res.redirect('/');
});

//Setup realtime backend
var io = require('socket.io')(server);
var backend = require('./backend/index');
backend(io);

//Launch the server
server.listen(config.port);
console.info(config.name + ' Running on Port ' + config.port);
