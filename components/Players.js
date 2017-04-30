import React from 'react';
import ReactDOM from 'react-dom';
import Display from './parts/Display.js';
import Registration from './Registration.js';
import Game from './Game';

class Players extends React.Component {

  constructor(props) {
    super(props);
    this.emit = this.emit.bind(this);
    // this.state = props.state;

    console.log("Players Props",props)
  }

  emit(event, payLoad){
    console.log("Players intercepted", event );
    // intercepts event before it reaches parent App Component

    // if ( event === 'join' ){
    //   this.setState({ player: payLoad });
    // }

    // does it's thing, then passes event to parent
    this.props.emit(event, payLoad);
  }

  render() {

    console.log("[R] PLAYERS")
    var show;

    if ( this.props.state.status === "connected" ){

      if ( !this.props.state.player.name ){

        // not as a player
        return (
                <div>
                    <Registration emit={ this.emit } />
                </div>
              );

      } else {

        // is a player
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