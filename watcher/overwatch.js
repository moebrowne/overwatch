'use strict';

var Tail = require('tail').Tail;
var io = require('socket.io')(3000);

io.on('connection', function(socket){
    console.log('connected');
});

var tail = new Tail("../syslog");

tail.on("line", function(data) {

    //console.log(data);

    var regex = /.+ ([^ ]+) apache2: \[(.+)] \[pid ([0-9]+)] \[client (.+)] \[(.+)] ([0-9]+) ([0-9]+) "([^"]+)" "([^"]+)" "([^"]+)"/g;

    var dataArray = regex.exec(data);

    if (dataArray === null) {
        return false;
    }

    console.log(dataArray);

    io.emit('data', dataArray);

});
