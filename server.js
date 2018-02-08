var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var _ = require('lodash');

users = [];

server.listen(process.env.NODE_PORT || 3000);
console.log('server running');

// app.get('/',function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function (socket) {
    console.log('connected: sockets connected ' + io.engine.clientsCount);
    socket.on('disconnect', function(data) {
        console.log('disconnected: sockets connected: ' + io.engine.clientsCount);
        // disconnect
        if(!socket.username) {
            return;
        }
        console.log('remove', socket.username);
        users[socket.room].splice(users[socket.room].indexOf(socket.username), 1);
        updateUserNames();
    });

    socket.on('sendMessage', function(data) {
        console.log('message sent');
        io.to(socket.room).emit('newMessage', {
            msg: data,
            username: socket.username
        });
    });

    socket.on('join', function(data) {
        console.log('room joined');
        socket.join(data.room);
        socket.room = data.room;
        if(typeof users[socket.room] == 'undefined') {
            users[socket.room] = [];
        }
        if(!data.username) {
            updateUserNames();
            return;
        }
        socket.username = data.username;
        // check if user is already in room
        let user = _.includes(users[socket.room], socket.username)
        if(!user) {
            // if not add to room
            users[socket.room].push(socket.username);
        }
        // return updated list of users
        updateUserNames();
    });

    function updateUserNames() {
        io.sockets.emit('getUserList', users[socket.room]);
    }

});