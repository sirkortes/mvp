import React from 'react';
import io from 'socket.io-client';
import Registration from './Registration.js';
import Game from './Game.js';
import Score from './Score.js';
import Display from './parts/Display.js';
import Players from './Players.js';



class APP extends React.Component {

  constructor(props) {
    super(props);
    this.joined = this.joined.bind(this);
    this.newPlayer = this.newPlayer.bind(this);
    this.playersUpdate = this.playersUpdate.bind(this);
    // this.renderChildren = this.renderChildren.bind(this);
    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.welcome = this.welcome.bind(this);
    this.update = this.update.bind(this);

    this.state = { 
        status: 'disconnected', 
        title: '',
        player: {} ,
        players: []
      }
  }

  componentWillMount(){
    
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
    this.socket.on('joined', this.joined);
    this.socket.on('newPlayer', this.newPlayer);
    this.socket.on('playersUpdate', this.playersUpdate);

  }

  emit(eventName, payLoad) {
    // SEND DATA TO SERVER THROUGH IO'S EMIT
    // console.log("APP EMITTING",eventName, payLoad )
    this.socket.emit(eventName, payLoad);
  }

  update( updatePackage ){
    // receive movement from players component
    // pass them to the server
    console.log("\nAPP UPDATING TO", updatePackage)
    let updatedPlayer = this.state.player;
    // console.log("UPDATED PLAYER START", updatedPlayer)
    updatedPlayer.location.x = updatePackage.x || updatedPlayer.location.x;
    updatedPlayer.location.y = updatePackage.y || updatedPlayer.location.y;
    updatedPlayer.rotation = updatePackage.rotation;
    updatedPlayer.life = updatePackage.life;

    // console.log("UPDATED PLAYER END", updatedPlayer)
    // this.setState({ player: updatedPlayer });
    this.emit( "update", [updatedPlayer, updatePackage.collitions] );
  }

  playersUpdate( updatedPlayers ) {
    // listens to playersUpdate from server,
    // updates our copy of data to update our components

    // remove player from players
    this.setState({ players: updatedPlayers });
  }

  joined({player, players}) {

    // console.log("joined player", player)
    // console.log("joined others", players)

    this.setState({ player: player, players: players });
    console.log("JOINED", player.name, players.length);

  }

  newPlayer(player){

    // this.setState({ players: this.state.players.push(player) })

    console.log("NEW PLAYER", player.name," - ", this.state.players.length );
  }

  connect() {

      this.setState({ status: 'connected' });
      // console.log("CONNECTED CLIENT - " + this.socket.id , this.state.status);
  }

  disconnect() {
      // console.log("DISCONNECTED CLIENT ", this.socket.id); 
      this.setState({ status: 'disconnected' });
  }

  welcome(serverState) {

    this.setState({ title: serverState.title })
  }

  // renderChildren(children) {
  //   var context = this;
  //   return React.Children.map( children, child => {

  //     // if (child.type === Registration){
  //       return React.cloneElement( 
  //         child, 
  //         { 
  //           emit: context.emit,
  //           status: this.state.status,
  //           player: this.state.player
  //         });
  //     // } else {
  //       // return child;
  //     // }

  //   });
  // }


  render(){
    // console.log("[R] APP THIS",this)
    return (
        <div id="app">
          {/*<Header title={ this.state.title } 
                  status={ this.state.status } />*}

            {/* this.renderChildren(this.props.children) */}
            <Players emit={ this.emit }
                     player={ this.state.player }
                     players={this.state.players }
                     status={ this.state.status }
                     update={ this.update }
                      />
        </div>
      );
  }

};

export default APP;