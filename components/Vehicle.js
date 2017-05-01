import React from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, {KEYDOWN, KEYUP} from 'react-key-handler';
import _ from 'underscore';

class Vehicle extends React.Component {

  constructor(props){
    super(props);
    this.move = this.move.bind(this);
    this.collition = this.collition.bind(this);
    this.state= { 
                  up: false,
                  right: false,
                  down: false,
                  left: false
                }

    // console.log("[P] Vehicle", props);
  }

  componentWIllMount(){

    // 

  }


  collition(x,y,id) {

    // check for collition every time we move
    /*
        boundaries:
        top : top
        left: left
        bottom: top + car's height
        right: left + car's width
    */

    let carwidth;
    let carheight;
    if ( this.props.player.type === 'A' ){

      carwidth = 38;
      carheight = 58;

    }

    let collitions = this.props.players.filter(function(player){
      
      if ( player.id !== id ){
        
        if ((  (player.location.x >= x) && (player.location.x <= (x+carwidth))  ) && ( (player.location.y >= y) && (player.location.y <= (y + carheight)) )) {
          // y collition
          return player;
        }

      }

    })


    // if ( collitions.length > 0 ){
    //   alert( "COLLITION! "+collitions[0].id+" / "+id);
    // }

    return collitions;

  }


  move(direction,e) {


    // console.log("EVENT", e);

    const context = this;
    const rotateSpeed = 30;
    const moveSpeed = 25;

    let updatePackage = { id: this.props.player.id,
                          life: this.props.player.life, 
                          rotation: this.props.player.rotation,
                          x: this.props.player.location.x,
                          y: this.props.player.location.y,
                          collitions: []
                        };

    // e.preventDefault();
    if ( e ){

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
    }

    // adjust rotation first
    if ( this.state.right ){

        updatePackage.rotation += rotateSpeed;

    } else if ( this.state.left ){

        updatePackage.rotation -= rotateSpeed;

    }

    // then move

    // move forward
    if ( this.state.up ){

      // calculate x & y based on rotation
      let timesRotated = Math.floor( updatePackage.rotation/360);
      let angle = ( updatePackage.rotation - (timesRotated*360));

      // console.log("angle",angle)

      let moving = false;

      const calculateMove = function(moveSpeed, angle){

        angle = Math.abs(angle);
        let percent;
        let top;
        let left;


        // up left
        if ( angle >= 270 && angle <= 360 ){

          percent = (((360-angle)/360)*100).toFixed(2);
          left = Math.floor((moveSpeed * percent)/80) * -1;
          top = Math.floor((moveSpeed*(100-percent))/100) * -1;
          console.log(angle,"UP-LEFT", 'left', left, 'top', top );
        }

        // up right
        else if ( angle >= 0 && angle <= 90 ){

          percent = (((90-angle)/90)*100).toFixed(2);
          top = Math.floor((moveSpeed * percent)/120) * -1;
          left = Math.floor((moveSpeed*(120-percent))/100);
          console.log(angle,"UP-RIGHT", 'left', left, 'top', top );

        // down right
        } else if ( angle >= 90 && angle <= 180 ){

          percent = (((180-angle)/180)*100).toFixed(2);
          left = Math.floor((moveSpeed * percent)/80);
          top = Math.floor((moveSpeed*(100-percent))/100);
          console.log(angle,"DOWN-RIGHT", 'left', left, 'top', top );

        // down left
        } else if ( angle >= 180 && angle <= 270 ){

          percent = (((270-angle)/270)*100).toFixed(2);
          top = Math.floor((moveSpeed * percent)/80);
          left = Math.floor((moveSpeed*(100-percent))/100) * -1;
          console.log(angle,"DOWN-LEFT", 'left', left, 'top', top );

        }
        // x, y
        return [ left, top];

      }
      
      const moveForward = function(moveSpeed, angle){
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



        if ( !moving && context.state.up ){
          console.log("MOVING");
          // moving = true;

          // calculate left and top to add


          // let [addleft, addtop] = calculateMove(moveSpeed, angle);
          // let left = context.props.player.location.x + addleft;
          // let top = context.props.player.location.y + addtop;

          let left = context.props.player.location.x + forwardMove[angle][0];
          let top = context.props.player.location.y - forwardMove[angle][1];

          // constrain to gameboard
          left = (left <= 0) ? 0 : (left >= 870) ? 870 : left;
           top =  (top <= 0) ? 0 : (top >= 540) ? 540 : top;

          updatePackage.x = left;
          updatePackage.y = top;

          // check for collition
          let collitions = context.collition(left, top, context.props.player.id);

          if ( collitions.length > 0 ){

            updatePackage.life = (updatePackage.life - 1 < 0) ? 0 : updatePackage.life - 1;

            if ( updatePackage.life === 0 ){

            }

            updatePackage.collitions = collitions;

          }

          context.props.update( updatePackage );

          // setTimeout( function(){ 
          //   console.log("stepped")
          //   moving = false; 

          //   if ( direction != 'up' && context.state.up ){
          //     // context.move("up");
          //     // trigger event
          //     window.dispatchEvent( new Event('KEYDOWN', { keyValue: 'ArrowUp', repeat: true }) );
          //     console.log("Dispatched?")
          //   }
          //   // if ( context.state.up ){ moveForward(); }
          // }, 100);

        } else {
          // it's moving, wait till it finishes
          console.log("BLOCK")
          // context.props.update( updatePackage );
        } 

      }

      // set move in motion
      if (!moving){ moveForward(moveSpeed, angle); }

    } else {
      // SEND UPDATE PACKAGE TO PARENT
      this.props.update( updatePackage );
    }
 
    // moving back IS FOR PUSSIES! BLOW CAR UP 
    // if ( this.state.down ){
    //     this.setState({ y: this.state.y + moveSpeed});
    // }


        // IF direction != up, 
        // if up is true, trigger keypress

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


      <div className={`vehicle type${ this.props.player.type }${this.props.player.life}`} style={{ 
                    left: this.props.player.location.x,
                    top: this.props.player.location.y,
                    transform: `rotate(${this.props.player.rotation}deg)`
                  }}>
      </div>

    </div>
    );
  }

}

export default Vehicle;
