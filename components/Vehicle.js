import React from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, {KEYPRESS} from 'react-key-handler';


class Vehicle extends React.Component {

  constructor(props){
    super(props);
    this.state = { x: 0, y: 0 };

    console.log("Props", props);
  }

  componentWIllMount(){


  }


  move(direction) {
    alert("MOVING "+direction);


  }


  render() {
    return (

    <div>
      <KeyHandler keyEventName='keydown' 
                  keyCode={38}
                  onKeyHandle={ () => this.move("up") } />

      <KeyHandler keyEventName='keydown' 
                  keyCode={37}
                  onKeyHandle={ () => this.move("left") } />

      <KeyHandler keyEventName='keydown' 
                  keyCode={39}
                  onKeyHandle={ () => this.move("right") } />

      <KeyHandler keyEventName='keydown' 
                  keyCode={40}
                  onKeyHandle={ () => this.move("down") } />

      <KeyHandler keyEventName='keydown' 
                  keyCode={32}
                  onKeyHandle={ () => this.move("spacebar") } />


      <div className={`vehicle type${ this.props.player.type }${this.props.player.life}`}>
      </div>
    </div>
    );
  }

}

export default Vehicle;

// ${this.props.player.life}