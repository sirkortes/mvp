import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
const DefaultRoute = Router.DefaultRoute;

import APP from './components/APP.js';
import Audience from './components/Audience.js'
import Speaker from './components/Speaker.js'
import Board from './components/Board.js'


// WHY YOU ROUTES NOT WORK?!?!
const routes = (
    <APP>
        <Route exact path="/" component={Audience}/>
        <Route path="/audience" component={Audience}/>
        <Route path="/speaker" component={Speaker}/>
        <Route path="/board" component={Board}/>
    </APP>
  );


  ReactDOM.render( 
    <Router>{routes}</Router>, 
    document.getElementById('react-container') 
  );
  
