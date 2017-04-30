import React from 'react';
import io from 'socket.io-client';
// import _ from 'underscore';
// import Header from './Header';
import Registration from './Registration.js';
import Game from './Game.js';
import Score from './Score.js';
import Display from './parts/Display.js';
import Players from './Players.js';



class APP extends React.Component {

  constructor(props) {
    super(props);
    this.joined = this.joined.bind(this);
    // this.renderChildren = this.renderChildren.bind(this);
    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.welcome = this.welcome.bind(this);

    this.state = { 
        status: 'disconnected', 
        title: '',
        player: {} 
      }
  }

  componentWillMount(){
    
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
    this.socket.on('joined', this.joined);
  }

  emit(eventName, payLoad) {
    // SEND DATA TO SERVER THROUGH IO'S EMIT
    console.log("EMITTING",eventName, payLoad )
    this.socket.emit(eventName, payLoad);
  }

  joined({player, players}) {
    this.setState({ player: player, players: players });
    console.log("JOINED",player, players);

  }

  connect() {

      // console.log("CONNECTED CLIENT - " + this.socket.id );
      this.setState({ status: 'connected' });
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
    console.log("[R] APP")
    return (
        <div id="app">
          {/*<Header title={ this.state.title } 
                  status={ this.state.status } />*}

            {/* this.renderChildren(this.props.children) */}
            <Players emit={ this.emit }
                     state={ this.state }
             />
        </div>
      );
  }

};

export default APP;