import React from 'react';
import ReactDOM from 'react-dom';
import Display from './parts/Display.js';
import Registration from './Registration.js';
import Game from './Game';

class Players extends React.Component {

  constructor(props) {
    super(props);
    this.emit = this.emit.bind(this);
    this.update = this.update.bind(this);

    console.log("[PROPS] Players:", this.props );
  }

  emit(event, payLoad){

    this.props.emit(event, payLoad);
  }

  update( updatePackage ) {
    // receive movement from game,
    // pass them to app
    this.props.update( updatePackage );
  }

  render() {

    var show;
    // console.log("[R] PLAYERS")

    if ( this.props.status === "connected" ){

      // console.log("[R] PLAYERS CONNECTED")
      if ( !this.props.player.name ){

        // not as a player
        // console.log("[R] PLAYERS REGISTRATION")
        return (
                <div>
                    <Registration emit={ this.emit } />
                </div>
              );

      } else {

        // is a player
        // console.log("[R] PLAYERS GAME")
        return (
                <div>
                    <Game 
                          player={ this.props.player } 
                          players={ this.props.players }
                          update={ this.update }
                    />
                </div>
              );

      }

    } else {

      return(
              <div>
                  <h1> YOU'RE NOT CONNECTED </h1>
              </div>
            );

    }

  }

};

export default Players;

/*

    if ( this.props.status === "connected" ){

      return (
              <div>
                <Display>
                  <h1> JOIN THE GAME </h1>
                  <Registration  data={ this.props } />
                </Display>
              </div>
            );

    } else {

      return(
              <div>
                <Display data={ this.props }>
                  <h1> YOU'RE IN </h1>
                </Display>
              </div>
            );

    }

  }


*/