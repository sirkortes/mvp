import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// const RouteHandler = Router.RouteHandler;

import io from 'socket.io-client';
import Header from './parts/Header';

class APP extends React.Component {

  constructor(props) {
    super(props);
    console.log("WTFPROPS",props);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.welcome = this.welcome.bind(this);
    this.state = { status: 'disconnected', title: '' }
  }

  componentWillMount(){
    
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
  }

  connect() {

      console.log("CONNECTED CLIENT - " + this.socket.id );
      this.setState({ status: 'connected' });
  }

  disconnect() {
      console.log("DISCONNECTED CLIENT ", this.socket.id); 
      this.setState({ status: 'disconnected' });
  }

  welcome(serverState) {
    this.setState({ title: serverState.title })
  }

  render(){
    return (
      <div>
        <Header title={ this.state.title } status={ this.state.status } />
        <div>{ this.props.match }</div>
      </div>
      );
  }

};

export default APP;