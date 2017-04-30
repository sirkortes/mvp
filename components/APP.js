import React from 'react';
// import { bowserHistory, hashHistory, Router, Route, Redirect, IndexRoute } from 'react-router';

import io from 'socket.io-client';
import Header from './parts/Header';
import Registration from './Registration.js'
// import Butler from './Butler.js';

class APP extends React.Component {

  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    this.emit = this.emit.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.welcome = this.welcome.bind(this);
    this.state = { status: 'disconnected', title: '' }

    // console.log("App Props",this.props)
  }

  componentWillMount(){
    
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
  }

  emit(eventName, payLoad) {
    // socket's own emit function 
    // we can use to send data to the server
    console.log("EMITTING FUCKING EVENT",eventName, payLoad)
    this.socket.emit(eventName, payLoad);
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

  renderChildren(children) {
    var context = this;
    // console.log("CONTEXT RENCHILDREN",context);

    return React.Children.map(children, child => {

      if (child.type === Registration){
        console.log("CLONING CHILD");
        return React.cloneElement(child, {
          emit: context.emit
        });
      } else {
        return child;
      }
    });
  }


  render(){
    return (
        <div>
          <Header title={ this.state.title } 
                  status={ this.state.status } />
            { this.renderChildren(this.props.children) } 
        </div>
      );
  }

};
// { console.log("it's FUCKIN CHILDREN", this.props.children )}
export default APP;