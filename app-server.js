const express = require('express');
const app = express();
const _ = require('underscore');

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

const server = app.listen(3000);
const io = require('socket.io').listen(server);


// Game Variables

const connections = [];
const players = [];

const title = "WELCOME TO THE JUNGLE";



io.sockets.on('connection', function(socket) {


    socket.once('disconnect', function() {

      var player = _.findWhere( players, { id: this.id });

      if ( player ){
        players.splice( players.indexOf(player), 1);

        // EMIT EVENT TO ALL SOCKETS
        io.sockets.emit( 'players', player );
        console.log("Left: %s ( %s Connected )", player.name, players.length);
      }

      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      console.log("Disconnected: %s sockets remaining", connections.length);
    });


    socket.on('join', function(player){

      console.log("%s JOINED",player.name);

      player.id = this.id;
      player.kills = 0;
      player.deaths = 0;
      player.score = 0;
      player.life = 3;
      
      this.emit( 'joined', player );

    })

    // Passing in title from server
    socket.emit('welcome', { title: title });

    connections.push(socket);
    console.log("CONNECTED: %s sockets connected", connections.length);

});

console.log("Server running at 3000!");