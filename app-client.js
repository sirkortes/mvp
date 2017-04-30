import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, hashHistory, Router, Route, Redirect, IndexRoute } from 'react-router';

import APP from './components/APP.js';
import Registration from './components/Registration.js'
import Players from './components/Players.js'
import Game from './components/Game.js'
import Score from './components/Score.js'
import Whoops404 from './components/Whoops404.js'

const Routes = (
      <Router history={browserHistory}>
        <Redirect from="/" to="/players"/>
        <Route path="/" component={APP}>
          <Route path="players" component={Players}/>
          <Route path="game" component={Game}/>
          <Route path="score" component={Score}/>
          <Route path ="*" component={Whoops404}/>
        </Route>
      </Router>
  );


// ReactDOM.render( 
//   Routes, 
//   document.getElementById('react-container') 
// );

ReactDOM.render( 
  <APP />, 
  document.getElementById('react-container') 
);

/* 
if we dont need another page, 
forget about the router,
render with if statements
*/