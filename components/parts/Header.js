import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  
  constructor(props){
    super(props);
  }


  render(){
    return (
        <header className="row">
        <div className="col-xs-10">
          <h1>{this.props.title}</h1>
        </div>
        <div className="col-xs-2">
          <span id="connection-status" className={this.props.status}></span>
        </div>
        </header>
      );
  }

}

Header.defaultProps = {
  status: 'disconnected'
}

Header.propTypes = {
      title: PropTypes.string.isRequired
    }

export default Header;