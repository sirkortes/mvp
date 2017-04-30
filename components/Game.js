import React from 'react';

class Game extends React.Component {

  constructor(props){
    super(props);
    console.log("GAME PROPS",props)
  }

  render() {
    return (
      <div>
        <h1>Game</h1>
        <section id="gameboard">

        </section>
      </div>
      );
  }
};

export default Game;

// render every player connected