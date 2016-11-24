var socket = io.connect('/Chat');
var chats = [];
socket.on('initial', function (data) {
    chats=data;
    updateState();
});
socket.on('create', function (data) {
    chats.push(data);
    updateState();
});
socket.on('update', function (data) {
    var i = chats.map(function (a) {
        return a.id;
    }).indexOf(data.id);
    chats[i] = data;
    updateState();
});
socket.on('delete', function (data) {
    var i = chats.map(function (a) {
        return a.id;
    }).indexOf(data.id);
    chats.splice(i,1);
    updateState();
});

function sendChat(msg) {
    socket.emit('create', {
        message: msg
    });
}

function deleteChat(id) {
    socket.emit('delete', {
        id: id
    });
}

function updateChat(id, msg) {
    socket.emit('update', {
        message: msg,
        id: id
    });
}

function updateState() {
    var output='';

    chats.forEach(function (chat) {
        output+='<span>'+chat.message+'</span> <button onclick="deleteChat(\''+ chat.id +'\')">Delete</button> <button onclick="updateChat(\''+ chat.id +'\',\''+ chat.message +'2\')">Update</button><br/>';
    });

    document.getElementById('chats').innerHTML=output;
}