const express = require('express');
const app = express();
const _ = require('underscore');
const port = (process.env.PORT || 3000)

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

const server = app.listen(port);

// io for localhost
// const io = require('socket.io').listen(server);

// io for heroku
const io = require('socket.io')({
  "transports": ["xhr-polling"], 
  "polling duration": 10
});



// Game Variables

const connections = [];
const players = [];

// let thisplayer = {
// this doesnt work, it'll be the same for everyone
// };

const title = "WELCOME TO BOOMPER CARS";



io.sockets.on('connection', function(socket) {

  console.log("CONNECTED")
  socket.emit('connect');

  connections.push(socket);
  console.log("CONNECTED: %s sockets connected", 
                connections.length );

  // on player disconnecting
  socket.once('disconnect', function() {

    var player = _.findWhere( players, { id: this.id });

    if ( player ){
      players.splice( players.indexOf(player), 1);

      // EMIT EVENT TO ALL SOCKETS
      io.sockets.emit( 'playersUpdate', players );
      console.log("Left: %s ( %s Connected )", player.name, players.length);
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("Disconnected: %s sockets remaining", connections.length);
  });

  // on join ( registered )
  socket.on('join', function(player){

    console.log("%s JOINED", player.name);

    player.id = this.id;
    player.kills = 0;
    player.deaths = 0;
    player.score = 0;
    player.life = 3;
    player.location = { 
      x: Math.floor(Math.random()*(870-2+1)+ 2) , 
      y: Math.floor(Math.random()*(540-2+1)+ 2)  
    };
    player.rotation = 0;

    // add to players ( to front )
    players.push( player );

    // send back to game
    this.emit( 'joined', 
              { player: player, players: players });

  })


  // on moving / updating
  socket.on('update', function([updated, collitions]){
    // receive updated player from app
    // update the player in server 
    // and broadcast players array

    // need to always find this player to update him
    let thisplayer = _.findWhere( players, { id: this.id });

    if ( thisplayer ){


        console.log("THISPLAYER",thisplayer.name, thisplayer.location );

        thisplayer.life = updated.life;
        thisplayer.rotation = updated.rotation;
        thisplayer.location.x = updated.location.x;
        thisplayer.location.y = updated.location.y;

        if ( collitions && collitions.length > 0 ){
          collitions.forEach(function(player){
            var p = _.findWhere( players, { id: player.id });
            p.life = p.life - 1 < 0 ? 0 : p.life - 1;
          });
        }

        io.sockets.emit( 'playersUpdate', players );

    }
  })

  // Passing in title from server
  // socket.emit('welcome', { title: title });
   

});

console.log("Server running at 3000!");