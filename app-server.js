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


    // on player disconnecting
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
      player.location = { x: 10, y: 10 };
      player.rotation = 0;

      // add to players
      players.push( player )

      // remove current player from players
      // when sending back as players container
      // does splice alter the seerver's array??? 
      // var others = players.splice( players.indexOf(player), 1);
      // console.log("OTHERS",others)

      // send back to game
      this.emit( 'joined', { player: player, players: players });

    })

    socket.on('action', function(data){
      // on action, update player data here in server
      // and send that data to everybody else
    })

    // Passing in title from server
    socket.emit('welcome', { title: title });

    connections.push(socket);
    console.log("CONNECTED: %s sockets connected", connections.length);

});

console.log("Server running at 3000!");