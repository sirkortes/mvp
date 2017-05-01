import React from 'react';
import Header from './Header.js';
import Vehicle from './Vehicle.js';

class Game extends React.Component {

  constructor(props){
    super(props);
    this.update = this.update.bind(this);
    console.log("[PROPS] Game: ", this.props );
  }

  update( updatePackage ){
    // receive movements from Vehicle,
    // pass them to Players Component
    console.log("pack through game");
    this.props.update( updatePackage );
  }

  render() {
    let context = this;
    return (
      <div id="gameContainer">

        <Header player={ this.props.player } />

        <section id="gameboard">

          { context.props.players.map( (p) => 
            <Vehicle key={ p.id } 
                     player={ p } 
                     players={ context.props.players }
                     update={ context.update } /> )}

        </section>


          <p id="devstat2"> 
            PLAYER ID: { this.props.player.id }
            <br/>
            PLAYERS: { JSON.stringify( this.props.players ) } 
          </p>



      </div>
      );
  }
};

export default Game;

// render every player connected


/*
  
  <Vehicle player={ this.props.player } 
                   update={ this.update } />

*/