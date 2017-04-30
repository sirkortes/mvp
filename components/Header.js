import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  
  constructor(props){
    super(props);
    console.log("[P] Header:", this.props)
  }


  render(){
    return (
        <div id="gameHead">
          <div id="headPlayerLeft">
            {/*<p className={`vehicle type${this.props.player.type}3 headPlayerType`}>
            </p>*/}
            <p id="headPlayerName">{ this.props.player.name}</p>
          </div>
          <div id="headPlayerRight">

            <p id="headPlayerTrophies">
              <span className="glyphicon glyphicon-star" aria-hidden="true">
              </span>
             { this.props.player.score }
            </p>

            <p id="headPlayerDeaths">
              <span className="glyphicon glyphicon-fire" aria-hidden="true">
              </span>
              { this.props.player.deaths }
            </p>

            <p id="headPlayerKills">
              <span className="glyphicon glyphicon-screenshot" aria-hidden="true">
              </span>
              { this.props.player.kills }
            </p>

          </div>
        </div>
      );
  }

}

// Header.defaultProps = {
//   status: 'disconnected'
// }

// Header.propTypes = {
//       title: PropTypes.string.isRequired
//     }

export default Header;


/*
  old header implementation
  <header className="row" style={{ textAlign: 'center' }}>
        <div className="col-xs-12">
           <h1>this.props.title</h1>
        </div>
        <div className="col-xs-2">
          <span id="connection-status" className={this.props.status}></span>
        </div>
        </header>

*/