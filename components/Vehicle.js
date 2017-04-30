import React from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, {KEYPRESS} from 'react-key-handler';


class Vehicle extends React.Component {

  constructor(props){
    super(props);
    this.move = this.move.bind(this);
    this.state= { 
                  x: this.props.player.location.x,
                  y: this.props.player.location.y,
                  rotation: this.props.player.rotation,
                  life: this.props.player.life,
                  type: this.props.player.type,
                  up: false,
                  right: false,
                  down: false,
                  left: false
                }
    console.log("[P] Vehicle", props);
  }

  componentWIllMount(){

    // 

  }


  move(direction,e) {
    const context = this;
    const rotateSpeed = 30;
    const moveSpeed = 20;

    e.preventDefault();

    // SET MOVEMENT STATES
    if ( direction === 'up' ){


      if ( e.type === "keydown" && !this.state.up ){
          this.setState({ up: true });

      } else if ( e.type === 'keyup' && this.state.up ){
          this.setState({ up: false });
      }

    } else if ( direction === 'down' ){


      if ( e.type === "keydown" && !this.state.down ){
          this.setState({ down: true });

      } else if ( e.type === 'keyup' && this.state.down ){
          this.setState({ down: false });
      }

    } else if ( direction === 'right' ){


      if ( e.type === "keydown" && !this.state.right ){
          this.setState({ right: true });

      } else if ( e.type === 'keyup' && this.state.right ){
          this.setState({ right: false });
      }
    
    } else if ( direction === 'left' ){


      if ( e.type === "keydown" && !this.state.left ){
          this.setState({ left: true });

      } else if ( e.type === 'keyup' && this.state.left ){
          this.setState({ left: false });
      }

    }

    // Implement on every call (because it will continuously be called)
      /* console.log("\nup: %s \ndown: %s \nleft: %s \nright: %s", 
                  this.state.up, 
                  this.state.down, 
                  this.state.left, 
                  this.state.right)*/


    // adjust rotation first
    if ( this.state.right ){
        this.setState({ rotation: this.state.rotation + rotateSpeed });
    } else if ( this.state.left ){
        this.setState({ rotation: this.state.rotation - rotateSpeed });
    }

    // then move

    // move forward
    if ( this.state.up ){

      // calculate x & y based on rotation
      let timesRotated = Math.floor(context.state.rotation/360);
      console.log("timesRotated",timesRotated);

      let angle = ( this.state.rotation - (timesRotated*360));
      console.log("angle",angle)

      // [ x, y ] ( left, top )
      const forwardMove = {
        // up
          "0": [ 0, 20 ],
        // top rights
         "30": [ 5, 15 ],
         "60": [ 10, 10 ],
        // right
         "90": [ 20, 0 ],
        // down rights
        "120": [ 10, -10],
        "150": [ 5, -15],
        // down
        "180": [ 0, -20],
        // down left
        "210": [ -5, -15 ],
        "240": [ -10, -10 ],
        // left
        "270": [ -20, 0 ],
        // up left
        "300": [ -10, 10 ],
        "330": [ -5, 15],
        // up
        "360": [ 0, 20],
      }

      let moving = false;
      const moveForward = function(){

        if ( !moving && context.state.up ){
          console.log("MOVING");
          moving = true;

          // calculate left
          let left = context.state.x + forwardMove[angle][0];
          left = left <= 0 ? 0 : left >= 970 ? 970 : left;
          
          // calculate top
          let top = context.state.y - forwardMove[angle][1];
          top = top <= 0 ? 0 : top >= 690 ? 690 : top;

          context.setState({ x: left, y: top });
          
          setTimeout( function(){ 
            console.log("stepped")
            moving = false; 
            moveForward();
          }, 120);

        } else {
          // it's moving, wait till it finishes
          console.log("BLOCK")
        } 

      }

      // set move in motion
      moveForward();

    }

    // move back
    if ( this.state.down ){
        this.setState({ y: this.state.y + moveSpeed});
    }




  }


  render() {
    return (

    <div>

      {/* keyups */}
      <KeyHandler keyEventName='keydown'  
                  keyValue="ArrowUp"
                  onKeyHandle={ (e) => this.move("up",e) } />

      <KeyHandler keyEventName='keydown' 
                  keyValue="ArrowLeft"
                  onKeyHandle={ (e) => this.move("left",e) } />

      <KeyHandler keyEventName='keydown' 
                  keyValue="ArrowRight"
                  onKeyHandle={ (e) => this.move("right",e) } />

      <KeyHandler keyEventName='keydown' 
                  keyValue="ArrowDown"
                  onKeyHandle={ (e) => this.move("down",e) } />

      {/* keydowns */}
      <KeyHandler keyEventName='keyup'  
                  keyValue="ArrowUp"
                  onKeyHandle={ (e) => this.move("up",e) } />

      <KeyHandler keyEventName='keyup' 
                  keyValue="ArrowLeft"
                  onKeyHandle={ (e) => this.move("left",e) } />

      <KeyHandler keyEventName='keyup' 
                  keyValue="ArrowRight"
                  onKeyHandle={ (e) => this.move("right",e) } />

      <KeyHandler keyEventName='keyup' 
                  keyValue="ArrowDown"
                  onKeyHandle={ (e) => this.move("down",e) } />

      <KeyHandler keyEventName='keyup' 
                  keyValue="Spacebar"
                  onKeyHandle={ (e) => this.move("spacebar",e) } />


      <div 
        className={`vehicle type${ this.state.type }${this.state.life}`}
            style={{ 
                    left: this.state.x,
                    top: this.state.y,
                    transform: `rotate(${this.state.rotation}deg)`
                  }}>
      </div>


    {/* 

        for every player in the players array,
        render a vehicle class, with the player's data
        player's data contains the coordenates

    */}
      
      <p id="devstat"> 
        STATE: { JSON.stringify(this.state ) } 
        <br/>
        PLAYER: { JSON.stringify(this.props.player ) } 
      </p>

    </div>
    );
  }

}

export default Vehicle;
