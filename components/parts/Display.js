import React from 'react';

class Display extends React.Component {

  constructor(props){
    super(props);
    console.log("DISPLAY PROPS",props)
  }

  render() {

    var show;
    console.log("PROPS.IF ? ", this.props.if )
    
    if ( this.props.if ){
      show = (<div>{ this.props.children }</div>);
    } else {
      show = null;
    } 

    return show;
  }
}

export default React;