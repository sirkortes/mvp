import React from 'react';
import ReactDOM from 'react-dom';
import { bowserHistory, hashHistory, Router, Route, Redirect, IndexRoute } from 'react-router';

import APP from './components/APP.js';
import Registration from './components/Registration.js'
import Game from './components/Game.js'
import Score from './components/Score.js'
import Whoops404 from './components/Whoops404.js'

const Routes = (
      <Router history={hashHistory}>
        <Redirect from="/" to="/register"/>
        <Route path="/" component={APP}>
          <Route path="register" component={Registration}/>
          <Route path="game" component={Game}/>
          <Route path="score" component={Score}/>
          <Route path ="*" component={Whoops404}/>
        </Route>
      </Router>
  );


ReactDOM.render( 
  Routes, 
  document.getElementById('react-container') 
);

//renderwithsprops () {
  //return (<List data={this.props}/>)
//}

//<Route path='blahblah' render={this.renderWithProps}
//}
  
