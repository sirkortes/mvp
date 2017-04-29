import React from 'react';
import Router from 'react-router';

var Link = Router.Link;

class Whoops404 {

  constructor(props){
    // super(props);
  }

  render(){
    return (
        <div id="not-found">
          <h1> Whooops! </h1>
          <p> 
            That's the wrong page,
            Were you looking for one of these:
          </p>
          <Link to="/"> Join as Audience </Link>
          <Link to="/speaker"> Start Presentation </Link>
          <Link to="/board"> View the Board </Link>

        </div>
      );
  }

}

export default Whoops404;