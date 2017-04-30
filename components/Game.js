import React from 'react';
import Header from './Header.js';
import Vehicle from './Vehicle.js';

class Game extends React.Component {

  constructor(props){
    super(props);
    console.log("GAME PROPS",props)
  }

  render() {
    return (
      <div id="gameContainer">

          <Header player={ this.props.player } />

        {/* <sidebar id="stats">
          
              for each user playing, 
              show user and stats
              sorted by trophies
          
        </sidebar>*/}

        <section id="gameboard">
          <Vehicle player={ this.props.player } />
        </section>

      </div>
      );
  }
};

export default Game;

// render every player connected