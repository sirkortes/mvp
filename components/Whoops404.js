import React from 'react';
import { bowserHistory, hashHistory, Router, Route, Redirect, IndexRoute, Link } from 'react-router';

class Whoops404 extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
        <div id="not-found">
          <h1> Whooops! </h1>
          <p> 
            That's the wrong page,
            try one of these:
          </p>
          <Link to="/"> Register </Link>
          <br/>
          <Link to="/game"> Play </Link>
          <br/> 
          <Link to="/score"> Scores </Link>

        </div>
      );
  }

}

export default Whoops404;