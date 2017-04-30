import React from 'react';
import ReactDOM from 'react-dom';
import Display from './parts/Display.js';
import Registration from './Registration.js';
import Game from './Game';

class Players extends React.Component {

  constructor(props) {
    super(props);
    this.emit = this.emit.bind(this);

    console.log("[P] Players:", props)
  }

  emit(event, payLoad){
    console.log("Players intercepted", event, payLoad );
    // intercepts event before it reaches parent App Component

    // if ( event === 'join' ){
    //   this.setState({ player: payLoad });
    // }

    // does it's thing, then passes event to parent
    this.props.emit(event, payLoad);
  }

  render() {

    var show;
    console.log("[R] PLAYERS")

    if ( this.props.state.status === "connected" ){

      console.log("[R] PLAYERS CONNECTED")
      if ( !this.props.state.player.name ){

        // not as a player
        console.log("[R] PLAYERS REGISTRATION")
        return (
                <div>
                    <Registration emit={ this.emit } />
                </div>
              );

      } else {

        // is a player
        console.log("[R] PLAYERS GAME")
        return (
                <div>
                    <Game player={ this.props.state.player } />
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